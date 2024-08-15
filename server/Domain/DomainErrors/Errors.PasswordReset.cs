using XResults;

namespace Domain.DomainErrors;

public static partial class Errors
{
    public static class PasswordReset     
    {
        public static Error IsAlreadyRequested => new("password.reset.is.already.requested");
        public static Error IsSameAsCurrent => new("password.reset.is.same.as.current");
    }
}