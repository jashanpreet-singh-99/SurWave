namespace OpenSurveyBackend.Interfaces;

public interface IEmailSender
{
    Task SendEmailAsync(string email, string password);
    Task SendResetEmailAsync(string email, string password);
    Task SendSurveyEmailAsync(string email, string username, string surveyName, string link);
}
