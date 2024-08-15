using XResults;

namespace Domain.DomainErrors;

public static partial class Errors
{
    public static class Email
    {
        public static Error IsRequired => new("email.is.required");
        public static Error IsTooLong => new("email.is.too.long");
        public static Error HasInvalidSignature => new("email.has.invalid.signature");
        public static Error IsAlreadyTaken => new("email.is.already.taken");
    }
}
