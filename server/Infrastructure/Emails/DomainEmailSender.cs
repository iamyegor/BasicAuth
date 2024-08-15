using System.Reflection;
using Domain.User.ValueObjects;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Infrastructure.Emails;

public class DomainEmailSender
{
    private readonly EmailSender _emailSender;
    private readonly string _htmlFolderPath = Path.Combine(
        Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)!,
        "Emails",
        "ui"
    );

    private readonly IWebHostEnvironment _env;

    public DomainEmailSender(EmailSender emailSender, IWebHostEnvironment env)
    {
        _emailSender = emailSender;
        _env = env;
    }

    public async Task SendEmailVerificationCode(string email, int code)
    {
        string htmlContent = await File.ReadAllTextAsync(
            Path.Combine(_htmlFolderPath, "email.html")
        );

        string emailBody = string.Format(htmlContent, code);
        await _emailSender.SendAsync(emailBody, email);
    }

    public async Task SendPasswordReset(PasswordResetToken token, string email)
    {
        string htmlContent = await File.ReadAllTextAsync(
            Path.Combine(_htmlFolderPath, "password-reset.html")
        );

        string address = _env.IsDevelopment()
            ? "http://localhost:80"
            : Environment.GetEnvironmentVariable("SITE_URL")!;

        address += "/";

        string emailBody = string.Format(htmlContent, address, token.Value);
        await _emailSender.SendAsync(emailBody, email);
    }
}
