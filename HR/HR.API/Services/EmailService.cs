using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace HR.API.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            await SendEmailInternalAsync(to, subject, body, null, null);
        }

        public async Task SendEmailWithAttachmentAsync(string to, string subject, string body, byte[] attachmentData, string attachmentName)
        {
            await SendEmailInternalAsync(to, subject, body, attachmentData, attachmentName);
        }

        private async Task SendEmailInternalAsync(string to, string subject, string body, byte[] attachmentData, string attachmentName)
        {
            var email = new MimeMessage();
            var fromEmail = _configuration["EmailSettings:FromEmail"] ?? "noreply@hrmanager.com";
            var fromName = _configuration["EmailSettings:FromName"] ?? "HR Manager System";
            
            email.From.Add(new MailboxAddress(fromName, fromEmail));
            email.To.Add(MailboxAddress.Parse(to));
            email.Subject = subject;

            var builder = new BodyBuilder
            {
                HtmlBody = body
            };

            if (attachmentData != null && !string.IsNullOrEmpty(attachmentName))
            {
                Console.WriteLine($"[DEBUG] Attaching file: {attachmentName}, Size: {attachmentData.Length} bytes");
                builder.Attachments.Add(attachmentName, attachmentData);
            }
            else 
            {
                Console.WriteLine("[DEBUG] No attachment provided or name is empty.");
            }

            email.Body = builder.ToMessageBody();

            using var smtp = new SmtpClient();
            try 
            {
                smtp.CheckCertificateRevocation = false;
                
                var host = _configuration["EmailSettings:Host"] ?? "smtp.example.com";
                var port = int.Parse(_configuration["EmailSettings:Port"] ?? "587");
                var user = _configuration["EmailSettings:User"];
                var pass = _configuration["EmailSettings:Password"];

                await smtp.ConnectAsync(host, port, MailKit.Security.SecureSocketOptions.StartTls);
                
                if (!string.IsNullOrEmpty(user) && !string.IsNullOrEmpty(pass))
                {
                    await smtp.AuthenticateAsync(user, pass);
                }
                
                await smtp.SendAsync(email);
            }
            finally
            {
                await smtp.DisconnectAsync(true);
            }
        }
    }
}
