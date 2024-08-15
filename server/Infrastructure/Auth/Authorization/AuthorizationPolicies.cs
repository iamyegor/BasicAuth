using Infrastructure.Auth.Authentication;
using Microsoft.AspNetCore.Authorization;

namespace Infrastructure.Auth.Authorization;

public static class AuthorizationPolicies
{
    public const string EmailVerified = "EmailVerifiedPolicy";
    public const string EmailNotVerified = "NeedToVerifyEmailPolicy";

    public static void AddPolicies(AuthorizationOptions config)
    {
        config.AddPolicy(EmailVerified, p => p.RequireClaim(JwtClaims.IsEmailVerified, "true"));

        config.AddPolicy(
            EmailNotVerified,
            p =>
            {
                p.RequireClaim(JwtClaims.IsEmailVerified, "false");
            }
        );
    }
}
