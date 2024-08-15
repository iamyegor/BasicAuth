using Domain.DomainErrors;
using Domain.User.ValueObjects;
using Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using XResults;

namespace Application.User.Queries.GetAuthStatus;

public record GetAuthStatusQuery(UserId UserId) : IRequest<Result<string, Error>>;

public class GetAuthStatusQueryHandler : IRequestHandler<GetAuthStatusQuery, Result<string, Error>>
{
    private readonly ApplicationContext _context;

    public GetAuthStatusQueryHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<Result<string, Error>> Handle(
        GetAuthStatusQuery query,
        CancellationToken cancellationToken
    )
    {
        Domain.User.User? user = await _context.Users.SingleOrDefaultAsync(
            x => x.Id == query.UserId,
            cancellationToken
        );
        if (user == null)
        {
            return Errors.User.NotFound;
        }

        return user.IsEmailVerified ? "authenticated" : "not-authenticated";
    }
}
