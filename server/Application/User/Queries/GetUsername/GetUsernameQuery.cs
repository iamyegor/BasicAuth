using Domain.DomainErrors;
using Domain.User.ValueObjects;
using MediatR;
using XResults;

namespace Application.User.Queries.GetUsername;

public record GetUsernameQuery(UserId UserId) : IRequest<Result<Login, Error>>;