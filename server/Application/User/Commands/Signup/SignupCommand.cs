using Domain.DomainErrors;
using Domain.User.ValueObjects;
using Infrastructure.Auth.Authentication;
using Infrastructure.Data;
using Infrastructure.Emails;
using MediatR;
using Microsoft.EntityFrameworkCore;
using XResults;

namespace Application.User.Commands.Signup;

public record SignupCommand(string Login, string Email, string Password, string? DeviceId)
    : IRequest<Result<Tokens, Error>>;

public class SignupCommandHandler : IRequestHandler<SignupCommand, Result<Tokens, Error>>
{
    private readonly ApplicationContext _context;
    private readonly TokensGenerator _tokensGenerator;
    private readonly DomainEmailSender _emailSender;

    public SignupCommandHandler(
        ApplicationContext context,
        TokensGenerator tokensGenerator,
        DomainEmailSender emailSender
    )
    {
        _context = context;
        _tokensGenerator = tokensGenerator;
        _emailSender = emailSender;
    }

    public async Task<Result<Tokens, Error>> Handle(SignupCommand request, CancellationToken ct)
    {
        Password password = Password.Create(request.Password);
        Email email = Email.Create(request.Email);
        Login login = Login.Create(request.Login);
        DeviceId deviceId = DeviceId.Create(request.DeviceId);

        Error? userAlreadyExistsError = await GetErrorIfUserAlreadyExists(login, email, ct);
        if (userAlreadyExistsError != null)
        {
            return userAlreadyExistsError;
        }

        Domain.User.User user = new(login, email, password);

        Tokens tokens = _tokensGenerator.GenerateTokens(user);
        user.AddRefreshToken(new RefreshToken(tokens.RefreshToken, deviceId));

        await _context.Users.AddAsync(user, ct);
        await _context.SaveChangesAsync(ct);

        await _emailSender.SendEmailVerificationCode(
            email.Value,
            user.EmailVerificationCode!.Value
        );

        return tokens;
    }

    private async Task<Error?> GetErrorIfUserAlreadyExists(
        Login login,
        Email email,
        CancellationToken ct
    )
    {
        Domain.User.User? userWithSameLogin = await _context.Users.SingleOrDefaultAsync(
            x => x.Login.Value == login.Value,
            cancellationToken: ct
        );
        if (userWithSameLogin != null && userWithSameLogin.IsEmailVerified)
        {
            return Errors.Login.IsAlreadyTaken;
        }

        await RemoveUnverifiedUser(userWithSameLogin, ct);

        Domain.User.User? userWithSameEmail = await _context.Users.SingleOrDefaultAsync(
            x => x.Email.Value == email.Value,
            cancellationToken: ct
        );
        if (userWithSameEmail != null && userWithSameEmail.IsEmailVerified)
        {
            return Errors.Email.IsAlreadyTaken;
        }

        await RemoveUnverifiedUser(userWithSameEmail, ct);

        return null;
    }

    private async Task RemoveUnverifiedUser(Domain.User.User? existingUser, CancellationToken ct)
    {
        if (existingUser != null)
        {
            _context.Users.Remove(existingUser);
            await _context.SaveChangesAsync(ct);
        }
    }
}
