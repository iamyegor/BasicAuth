namespace Domain.DomainErrors;

public static partial class Errors
{
    public static class Login
    {
        public static Error HasInvalidLength => new("login.has.invalid.length");
        public static Error HasInvalidSymbols => new("login.has.invalid.symbols");
        public static Error IsAlreadyTaken => new("login.is.already.taken");
    }
}
