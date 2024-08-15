namespace Domain.DomainErrors;

public static partial class Errors
{
    public static class PasswordResetToken
    {
        public static Error IsInvalid => new("password.reset.token.is.invalid");
        public static Error NotFound => new("password.reset.token.not.found");
    }
}
