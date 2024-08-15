using Application.Common.FluentValidation;
using Domain.User.ValueObjects;
using FluentValidation;

namespace Application.User.Queries.IsResetPasswordTokenActive;

public class IsResetPasswordTokenActiveValidator
    : AbstractValidator<IsResetPasswordTokenActiveQuery>
{
    public IsResetPasswordTokenActiveValidator()
    {
        RuleFor(x => x.Token).MustBeOk(PasswordResetToken.Create);
    }
}