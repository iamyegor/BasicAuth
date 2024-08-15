using Domain.DomainErrors;
using Domain.User.ValueObjects;
using Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using XResults;

namespace Application.User.Queries.GetUsername;

public class GetUsernameQueryHandler : IRequestHandler<GetUsernameQuery, Result<Login, Error>>
{
    private readonly ApplicationContext _context;

    public GetUsernameQueryHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<Result<Login, Error>> Handle(GetUsernameQuery request, CancellationToken ct)
    {
        Login? login = await _context
            .Users.Where(x => x.Id == request.UserId)
            .Select(x => x.Login)
            .AsNoTracking()
            .SingleOrDefaultAsync(cancellationToken: ct);

        if (login == null)
        {
            return Errors.User.NotFound;
        }

        return login;
    }
}