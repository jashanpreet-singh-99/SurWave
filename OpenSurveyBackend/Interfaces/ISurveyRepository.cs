using Microsoft.AspNetCore.Mvc;
using OpenSurveyBackend.Models;

namespace OpenSurveyBackend.Interfaces;

public interface ISurveyRepository
{
    Task<Survey?> GetSurvey(int id);
    Task<Survey?> GetCompleteSurvey(int id);
    Task<IEnumerable<Survey>> GetSurveys();
    void AddSurvey(Survey survey);
    void DeleteSurvey(Survey survey);
    void UpdateSurvey(Survey survey);
    Task<int> GetCountOfEndingSoon();
    Task<int> GetActiveSurveys();
    int GetQuestionCount(int surveyId);
    void RemoveQuestion(Question question);
    void RemoveOptions(ICollection<Option> options);
}
