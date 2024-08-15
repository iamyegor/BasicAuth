using Api.Controllers.Common;
using Api.Dtos;
using Application.User.Commands.RequestPasswordReset;
using Application.User.Commands.Signin;
using Application.User.Commands.Signup;
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
public class AuthenticationController : ApplicationController
{
    private readonly IMediator _mediator;

    public AuthenticationController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup(SignupDto dto)
    {
        Request.Cookies.TryGetValue(CookiesInfo.DeviceId.Name, out string? deviceId);
        SignupCommand signupCommand = new(dto.Login, dto.Email, dto.Password, deviceId);
        Result<Tokens, Error> tokensOrError = await _mediator.Send(signupCommand);
        if (tokensOrError.IsFailure)
        {
            return Problem(tokensOrError.Error);
        }

        HttpContext.Response.Cookies.Append(tokensOrError.Value);

        return Ok();
    }

    [HttpPost("signin")]
    public async Task<IActionResult> Signin(SigninDto dto)
    {
        Request.Cookies.TryGetValue(CookiesInfo.DeviceId.Name, out string? deviceId);
        SigninCommand signinCommand = new(dto.LoginOrEmail, dto.Password, deviceId);

        Result<Tokens, Error> tokensOrError = await _mediator.Send(signinCommand);
        if (tokensOrError.IsFailure)
        {
            return Problem(tokensOrError.Error);
        }

        HttpContext.Response.Cookies.Append(tokensOrError.Value);

        return Ok();
    }

}
