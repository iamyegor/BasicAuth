using Api.Controllers.Common;
using Application.User.Queries.GetAuthStatus;
using Application.User.Queries.GetEmailStatus;
using Application.User.Queries.GetUsername;
using Domain.DomainErrors;
using Domain.User.ValueObjects;
using Infrastructure.Cookies;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using XResults;

namespace Api.Controllers;

[ApiController]
[Route("api")]
public class UserController : ApplicationController
{
    private readonly UserIdExtractor _userIdExtractor;
    private readonly IMediator _mediator;

    public UserController(UserIdExtractor userIdExtractor, IMediator mediator)
    {
        _userIdExtractor = userIdExtractor;
        _mediator = mediator;
    }

    [Authorize]
    [HttpGet("username")]
    public async Task<IActionResult> GetUsername()
    {
        Result<UserId, Error> userIdOrError = _userIdExtractor.ExtractUserId(Request.Cookies);
        if (userIdOrError.IsFailure)
        {
            return Problem(userIdOrError.Error);
        }

        GetUsernameQuery query = new(userIdOrError.Value);
        Result<Login, Error> loginOrError = await _mediator.Send(query);
        if (loginOrError.IsFailure)
        {
            return Problem(loginOrError.Error);
        }

        return Ok(loginOrError.Value.Value);
    }

    [Authorize]
    [HttpGet("email-status")]
    public async Task<IActionResult> GetEmailStatus()
    {
        Result<UserId, Error> userIdOrError = _userIdExtractor.ExtractUserId(Request.Cookies);
        if (userIdOrError.IsFailure)
        {
            return Problem(userIdOrError.Error);
        }

        GetEmailStatusQuery query = new(userIdOrError.Value);
        Result<string, Error> emailStatusOrError = await _mediator.Send(query);
        if (emailStatusOrError.IsFailure)
        {
            return Problem(emailStatusOrError.Error);
        }

        return Ok(emailStatusOrError.Value);
    }

    [Authorize]
    [HttpGet("auth-status")]
    public async Task<IActionResult> GetAuthStatus()
    {
        Result<UserId, Error> userId = _userIdExtractor.ExtractUserId(Request.Cookies);
        if (userId.IsFailure)
        {
            return Problem(userId.Error);
        }

        GetAuthStatusQuery query = new(userId);
        Result<string, Error> statusOrError = await _mediator.Send(query);
        if (statusOrError.IsFailure)
        {
            return Problem(statusOrError.Error);
        }

        return Ok(statusOrError.Value);
    }
}
