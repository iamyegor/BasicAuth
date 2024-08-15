namespace Domain.DomainErrors;

public static partial class Errors
{
    public static class Password
    {
        public static Error HasInvalidSignature => new("password.has.invalid.signature");
        public static Error HasInvalidLength => new("password.has.invalid.length");
        public static Error IsRequired => new("password.is.required");
    }
}
