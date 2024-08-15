using Domain.DomainErrors;
using Domain.User.ValueObjects;
using Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using XResults;

namespace Application.User.Commands.VerifyEmail;

public record VerifyEmailCommand(UserId UserId, string Code) : IRequest<SuccessOr<Error>>;

public class VerifyEmailCommandHandler : IRequestHandler<VerifyEmailCommand, SuccessOr<Error>>
{
    private readonly ApplicationContext _context;

    public VerifyEmailCommandHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<SuccessOr<Error>> Handle(VerifyEmailCommand request, CancellationToken ct)
    {
        EmailVerificationCode code = EmailVerificationCode.Create(request.Code);
        Domain.User.User? user = await _context.Users.SingleOrDefaultAsync(x => x.Id == request.UserId, ct);
        if (
            user == null
            || user.EmailVerificationCode == null
            || user.EmailVerificationCode != code
        )
        {
            return Errors.EmailVerificationCode.IsInvalid;
        }

        if (user.EmailVerificationCode.IsExpired)
        {
            return Errors.EmailVerificationCode.IsExpired;
        }

        user.VerifyEmail();
        await _context.SaveChangesAsync(ct);

        return Result.Ok();
    }
}
