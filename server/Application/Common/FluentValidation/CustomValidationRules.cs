using Domain.DomainErrors;
using FluentValidation;
using XResults;

namespace Application.Common.FluentValidation;

public static class CustomValidationRules
{
    public static void MustBeOk<T, TProperty, TValue>(
        this IRuleBuilder<T, TProperty> ruleBuilder,
        Func<TProperty, Result<TValue, Error>> callback
    )
    {
        ruleBuilder.Custom(
            (value, context) =>
            {
                Result<TValue, Error> result = callback(value);
                if (result.IsFailure)
                {
                    context.AddError(result.Error);
                }
            }
        );
    }

    public static IRuleBuilderOptionsConditions<T, string> MustBeValidDeviceId<T>(
        this IRuleBuilder<T, string?> ruleBuilder
    )
    {
        return ruleBuilder.Custom(
            (value, context) =>
            {
                if (string.IsNullOrWhiteSpace(value) || !Guid.TryParse(value, out _))
                {
                    context.AddError(Errors.DeviceId.IsInvalid);
                }
            }
        )!;
    }
}
