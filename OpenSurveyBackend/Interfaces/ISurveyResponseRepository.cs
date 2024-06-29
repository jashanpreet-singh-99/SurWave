using OpenSurveyBackend.Dtos;
using OpenSurveyBackend.Models;

namespace OpenSurveyBackend.Interfaces;

public interface ISurveyResponseRepository
{
    void SaveResponses(List<SurveyResponse> surveyResponses);

    Task<bool> AlreadySubmitted(SurveyResponse surveyResponse);
    Task<IEnumerable<QuestionResponseDto>> GetResultForQuestion(int questionId);
    Task<int> GetTotalPossibleResponses(int surveyId);
    Task<int> GetTotalResponses(int surveyId);
    Task<IEnumerable<SurveyResponse>> GetAllResponseReport(int surveyId);
    Task<int> GetTotalUserResponseCount();
}