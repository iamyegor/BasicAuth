using Domain.DomainErrors;
using Domain.User.ValueObjects;
using Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using XResults;

namespace Application.User.Queries.GetEmailStatus;

public record GetEmailStatusQuery(UserId UserId) : IRequest<Result<string, Error>>;

public class GetEmailStatusQueryHandler
    : IRequestHandler<GetEmailStatusQuery, Result<string, Error>>
{
    private readonly ApplicationContext _context;

    public GetEmailStatusQueryHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<Result<string, Error>> Handle(GetEmailStatusQuery query, CancellationToken ct)
    {
        Domain.User.User? user = await _context.Users.SingleOrDefaultAsync(x => x.Id == query.UserId, ct);
        if (user == null)
        {
            return Errors.User.NotFound;
        }

        return user.IsEmailVerified ? "verified" : "not-verified";
    }
}
