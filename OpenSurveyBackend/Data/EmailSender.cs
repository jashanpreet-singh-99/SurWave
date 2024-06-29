using System.Net;
using System.Net.Mail;
using OpenSurveyBackend.Interfaces;

namespace OpenSurveyBackend.Data;

public class EmailSender: IEmailSender
{
    private const string AppName = "Open Survey";
    private const string Subject = $"Your {AppName} Project Account Has Been Created";
    private const string SubjectR = $"Your {AppName} Project Password Has Been Reset";
    private const string SubjectS = $"Invitation to Participate in Open Survey";
    private const string MasterEmail = "open.survey.project@outlook.com";
    private const string MasterPw = "openSurvey";
    private const string EmailHost = "smtp-mail.outlook.com";

    private const string MessageTop = $@"Dear User,
                            We are pleased to inform you that your account for the {AppName} Project has been successfully created by the administrator.

                            Here are your login credentials:

                            Email: ";

    private const string MessageMid = "\nPassword: ";
    private const string MessageEnd = $@"

                            Please keep these credentials confidential and do not share them with anyone. 

                            In case you encounter any issues with your login credentials or have any other concerns, please let us know as soon as possible. You can reach out to the administrator directly.

                            Thank you for joining the {AppName} Project. We look forward to your valuable contributions.

                            Best Regards,
                            {AppName} Project Team";

    private const string MessageRTop = $@"Dear User,

                            We are writing to inform you that your password for the {AppName} Project has been successfully reset. 
                            
                            Your new password is: ";
    
    private const string MessageREnd = $@"

                            If you did not request a password reset, please contact our administrator immediately. It’s possible that someone else has access to your account, and we want to ensure your data remains secure.

                            Thank you for using {AppName} Project. We value your trust and work hard to keep your data safe.

                            Best regards,
                           {AppName} Project Team";

    private const string MessageSStart = $@"Dear ";
    private const string MessageSMid = $@",
    We hope this message finds you well. We're reaching out from the { AppName } Project because we value your perspective and would appreciate your participation in our latest survey.
    
    Survey Link: ";
    private const string MessageSEnd = $@"

    We kindly request you to use this link to open and complete the survey. Please keep this link confidential and use it for your participation only.

    Rest assured, any information shared will be used solely by our organization for research purposes. Your privacy is our utmost priority. If at any point you feel that the information requested is too private or sensitive, please feel free to contact us or ignore the survey.

    Your participation is greatly appreciated, and we look forward to your valuable input.

    Best regards,
    {AppName} Project Team";
    
    public Task SendEmailAsync(string email, string password)
    {
        var client = new SmtpClient(EmailHost, 587)
        {
            EnableSsl = true,
            Credentials = new NetworkCredential(MasterEmail, MasterPw)
        };
        var message = GenerateRegisterMessage(email, password);
        return client.SendMailAsync(new MailMessage(from: MasterEmail, to: email, Subject, message));
    }

    public Task SendResetEmailAsync(string email, string password)
    {
        var client = new SmtpClient(EmailHost, 587)
        {
            EnableSsl = true,
            Credentials = new NetworkCredential(MasterEmail, MasterPw)
        };
        var message = GenerateResetMessage(password);
        return client.SendMailAsync(new MailMessage(from: MasterEmail, to: email, SubjectR, message));
    }

    public Task SendSurveyEmailAsync(string email, string username, string surveyName, string link)
    {
        var client = new SmtpClient(EmailHost, 587)
        {
            EnableSsl = true,
            Credentials = new NetworkCredential(MasterEmail, MasterPw)
        };
        var message = GenerateSurveyMessage(email, username, link);
        Console.WriteLine("Email " + message);
        return client.SendMailAsync(new MailMessage(from: MasterEmail, to: email, SubjectS, message));
    }

    private string GenerateRegisterMessage(string email, string password)
    {
        return MessageTop + email + MessageMid + password + MessageEnd;
    }
    
    private string GenerateResetMessage(string password)
    {
        return MessageRTop + password + MessageREnd;
    }

    private string GenerateSurveyMessage(string email, string username, string link)
    {
        return MessageSStart + username + MessageSMid + link + " - ( user-email : " + email + " )"+ MessageSEnd;
    }
}