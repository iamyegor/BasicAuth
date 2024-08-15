namespace Domain.DomainErrors;

public static partial class Errors
{
    public static class User
    {
        public static Error AlreadyExists => new("user.already.exists");
        public static Error NotFound => new("user.not.found");
        public static Error InvalidLoginOrPassword => new("user.invalid.login.or.password");
    }
}
