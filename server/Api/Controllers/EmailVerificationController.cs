using Api.Controllers.Common;
using Api.Dtos;
using Application.User.Commands.ResendEmailCode;
using Application.User.Commands.VerifyEmail;
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
public class EmailVerificationController : ApplicationController
{
    private readonly UserIdExtractor _userIdExtractor;
    private readonly IMediator _mediator;

    public EmailVerificationController(UserIdExtractor userIdExtractor, IMediator mediator)
    {
        _userIdExtractor = userIdExtractor;
        _mediator = mediator;
    }

    [Authorize]
    [HttpPost("verify-email")]
    public async Task<IActionResult> VerifyEmail(VerifyEmailDto dto)
    {
        Result<UserId, Error> userIdOrError = _userIdExtractor.ExtractUserId(Request.Cookies);
        if (userIdOrError.IsFailure)
        {
            return Problem(userIdOrError.Error);
        }

        VerifyEmailCommand verifyEmailCommand = new(userIdOrError.Value, dto.Code);
        SuccessOr<Error> result = await _mediator.Send(verifyEmailCommand);
        if (result.IsFailure)
        {
            return Problem(result.Error);
        }

        return Ok();
    }

    [Authorize]
    [HttpPost("resend-email-code")]
    public async Task<IActionResult> ResendEmailCode()
    {
        Result<UserId, Error> userIdOrError = _userIdExtractor.ExtractUserId(Request.Cookies);
        if (userIdOrError.IsFailure)
        {
            return Problem(userIdOrError.Error);
        }

        ResendEmailCodeCommand resendEmailCodeCommand = new(userIdOrError.Value);
        SuccessOr<Error> result = await _mediator.Send(resendEmailCodeCommand);

        return FromResult(result);
    }
}