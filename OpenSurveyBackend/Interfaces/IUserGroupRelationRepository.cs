using OpenSurveyBackend.Models;

namespace OpenSurveyBackend.Interfaces;

public interface IUserGroupRelationRepository
{
    void AddRelation(UserGroupRelation? userGroupRelation);
    void RemoveRelation(UserGroupRelation? userGroupRelation);
    Task<UserGroupRelation?> FindUserGroupRelation(int userId, int groupId);
    Task<IEnumerable<UserGroup?>> GetUsersUserGroups(int userId);
    Task<IEnumerable<User?>> GetUsersInUserGroup(int groupId);
    Task<bool> GetUserCanAccessSurvey(int userId, int surveyId);

}
