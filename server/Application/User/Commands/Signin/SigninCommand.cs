using Domain.DomainErrors;
using Domain.User.ValueObjects;
using Infrastructure.Auth.Authentication;
using Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using XResults;

namespace Application.User.Commands.Signin;

public record SigninCommand(string LoginOrEmail, string Password, string? DeviceId)
    : IRequest<Result<Tokens, Error>>;

public class SigninCommandHandler : IRequestHandler<SigninCommand, Result<Tokens, Error>>
{
    private readonly ApplicationContext _context;
    private readonly TokensGenerator _tokensGenerator;

    public SigninCommandHandler(ApplicationContext context, TokensGenerator tokensGenerator)
    {
        _context = context;
        _tokensGenerator = tokensGenerator;
    }

    public async Task<Result<Tokens, Error>> Handle(SigninCommand command, CancellationToken ct)
    {
        DeviceId deviceId = DeviceId.Create(command.DeviceId);

        Domain.User.User? user = await _context.Users.SingleOrDefaultAsync(
            x => x.Login.Value == command.LoginOrEmail || x.Email.Value == command.LoginOrEmail,
            ct
        );
        if (user == null || !user.Password.Matches(command.Password))
        {
            return Errors.User.InvalidLoginOrPassword;
        }

        Tokens tokens = _tokensGenerator.GenerateTokens(user);
        user.AddRefreshToken(new RefreshToken(tokens.RefreshToken, deviceId));

        await _context.SaveChangesAsync(ct);

        return tokens;
    }
}
