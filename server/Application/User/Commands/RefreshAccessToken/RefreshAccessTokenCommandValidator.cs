using Application.Common.FluentValidation;
using FluentValidation;

namespace Application.User.Commands.RefreshAccessToken;

public class RefreshAccessTokenCommandValidator : AbstractValidator<RefreshAccessTokenCommand>
{
    public RefreshAccessTokenCommandValidator()
    {
        RuleFor(x => x.DeviceId).MustBeValidDeviceId();
    }
}
