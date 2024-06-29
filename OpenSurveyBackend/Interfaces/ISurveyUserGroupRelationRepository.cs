using OpenSurveyBackend.Dtos;
using OpenSurveyBackend.Models;

namespace OpenSurveyBackend.Interfaces;

public interface ISurveyUserGroupRelationRepository
{
    void AddUserGroupToSurvey(SurveyUserGroupRelation surveyUserGroupRelation);

    Task<IEnumerable<Survey?>> GetSurveySpecificToUserId(int userId);

    Task<Survey?> UserAuthorizedSurvey(int userId, int surveyId);
    List<User> GetUsersLinkedToSurvey(int surveyId);

    IEnumerable<SurveyCompleteDto> GetSurveyCompletedStatus(IEnumerable<SurveyListDto> surveyIds);
    void RemoveSurveyUserGroupEntries(int surveyId);
}