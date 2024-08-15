using Application.Common.FluentValidation;
using Domain.User.ValueObjects;
using FluentValidation;

namespace Application.User.Commands.Signup;

public class SignupCommandValidator : AbstractValidator<SignupCommand>
{
    public SignupCommandValidator()
    {
        RuleFor(x => x.Login).MustBeOk(Login.Create);
        RuleFor(x => x.Email).MustBeOk(Email.Create);
        RuleFor(x => x.Password).MustBeOk(Password.Create);
        RuleFor(x => x.DeviceId).MustBeOk(DeviceId.Create);
    }
}
