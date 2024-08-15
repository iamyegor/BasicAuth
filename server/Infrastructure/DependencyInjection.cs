using Infrastructure.Auth.Authentication;
using Infrastructure.Auth.Authorization;
using Infrastructure.Cookies;
using Infrastructure.Data;
using Infrastructure.Data.Dapper;
using Infrastructure.Emails;
using Infrastructure.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services,
        IConfiguration config,
        bool isDevelopment
    )
    {
        ConnectionStringResolver connectionStringResolver = new ConnectionStringResolver(config);
        string connectionString = connectionStringResolver.GetBasedOnEnvironment();

        services
            .AddScoped(_ => new ApplicationContext(connectionString, isDevelopment))
            .AddTransient<DapperConnectionFactory>()
            .AddTransient<HttpClient>()
            .AddTransient<ConnectionStringResolver>()
            .AddUtils()
            .AddAuthentication(config)
            .AddAuthorization()
            .AddEmails(config);

        return services;
    }

    private static IServiceCollection AddUtils(this IServiceCollection services)
    {
        services.AddTransient<UserIdExtractor>();

        return services;
    }

    private static IServiceCollection AddAuthentication(
        this IServiceCollection services,
        IConfiguration config
    )
    {
        services.AddTransient<TokensGenerator>();
        services.AddTransient<JwtClaims>();
        services.AddTransient<JwtValidationParameters>();
        services.Configure<JwtSettings>(config.GetSection(nameof(JwtSettings)));

        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                ServiceProvider serviceProvider = services.BuildServiceProvider();
                var validationParameters =
                    serviceProvider.GetRequiredService<JwtValidationParameters>();

                options.TokenValidationParameters = validationParameters.GetParameters();
                options.Events = BearerEvents.ExtractTokenFromCookieEvent();
            });

        return services;
    }

    private static IServiceCollection AddAuthorization(this IServiceCollection services)
    {
        services.AddAuthorization(AuthorizationPolicies.AddPolicies);

        return services;
    }

    private static IServiceCollection AddEmails(
        this IServiceCollection services,
        IConfiguration config
    )
    {
        services.Configure<EmailSettings>(config.GetSection(nameof(EmailSettings)));
        services.PostConfigure<EmailSettings>(settings =>
        {
            settings.Password = Environment.GetEnvironmentVariable("OUTLOOK_PASSWORD")!;
        });

        services.AddTransient<DomainEmailSender>();
        services.AddTransient<EmailSender>();

        return services;
    }
}
