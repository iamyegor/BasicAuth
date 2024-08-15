using Domain.User.ValueObjects;
using Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.User.Queries.IsResetPasswordTokenActive;

public record IsResetPasswordTokenActiveQuery(string Token) : IRequest<bool>;

public class IsResetPasswordTokenActiveQueryHandler
    : IRequestHandler<IsResetPasswordTokenActiveQuery, bool>
{
    private readonly ApplicationContext _context;

    public IsResetPasswordTokenActiveQueryHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(IsResetPasswordTokenActiveQuery query, CancellationToken ct)
    {
        PasswordResetToken token = PasswordResetToken.Create(query.Token);
        Domain.User.User? userWithSameToken = await _context.Users.SingleOrDefaultAsync(
            x => x.PasswordResetToken != null && x.PasswordResetToken.Value == token.Value,
            ct
        );

        return userWithSameToken != null && !userWithSameToken.PasswordResetToken!.IsExpired;
    }
}
