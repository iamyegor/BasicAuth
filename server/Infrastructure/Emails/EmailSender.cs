using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Options;

namespace Infrastructure.Emails;

public class EmailSender
{
    private readonly EmailSettings _emailSettings;

    public EmailSender(IOptions<EmailSettings> emailSettings)
    {
        _emailSettings = emailSettings.Value;
    }

    public async Task SendAsync(string html, string recepient)
    {
        using (var client = new SmtpClient(_emailSettings.MailServer, _emailSettings.MailPort))
        {
            client.Credentials = new NetworkCredential(
                _emailSettings.Username,
                _emailSettings.Password
            );
            client.EnableSsl = true;

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_emailSettings.SenderEmail, _emailSettings.SenderName),
                Subject = "Verification code for CleanAuth",
                Body = html,
                IsBodyHtml = true
            };
            mailMessage.To.Add(recepient);

            await client.SendMailAsync(mailMessage);
        }
    }
}
