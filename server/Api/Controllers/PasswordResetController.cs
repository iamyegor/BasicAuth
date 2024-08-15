using Api.Controllers.Common;
using Api.Dtos;
using Application.User.Commands.RequestPasswordReset;
using Application.User.Commands.ResetPassword;
using Application.User.Queries.IsResetPasswordTokenActive;
using Domain.DomainErrors;
using Infrastructure.Auth.Authentication;
using Infrastructure.Cookies;
using Infrastructure.Cookies.Extensions;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using XResults;

namespace Api.Controllers;

[ApiController]
[Route("api")]
public class PasswordResetController : ApplicationController
{
    private readonly IMediator _mediator;

    public PasswordResetController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("request-password-reset")]
    public async Task<IActionResult> RequestPasswordReset(RequestPasswordResetDto dto)
    {
        RequestPasswordResetCommand command = new(dto.LoginOrEmail);
        SuccessOr<Error> result = await _mediator.Send(command);
        return FromResult(result);
    }

    [HttpGet("is-reset-password-token-active")]
    public async Task<IActionResult> IsResetPasswordTokenActive([FromQuery] string token)
    {
        IsResetPasswordTokenActiveQuery query = new(token);
        bool isResetPasswordTokenActive = await _mediator.Send(query);
        if (isResetPasswordTokenActive)
        {
            return NoContent();
        }
        else
        {
            return StatusCode(412, "Token is not active");
        }
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword(ResetPasswordDto dto)
    {
        Request.Cookies.TryGetValue(CookiesInfo.DeviceId.Name, out string? deviceId);
        ResetPasswordCommand command = new(dto.Token, dto.NewPassword, deviceId);
        Result<Tokens, Error> tokensOrError = await _mediator.Send(command);
        if (tokensOrError.IsFailure)
        {
            return Problem(tokensOrError.Error);
        }

        HttpContext.Response.Cookies.Append(tokensOrError.Value);

        return Ok();
    }
}
