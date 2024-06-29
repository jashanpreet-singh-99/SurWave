using OpenSurveyBackend.Models;

namespace OpenSurveyBackend.Interfaces;

public interface IUserGroupRepository
{
    Task<bool> UserGroupExist(string name);
    void AddUserGroup(UserGroup userGroup);
    Task<IEnumerable<UserGroup>> GetUserGroups();
    Task<UserGroup?> GetUserGroup(int id);
    void RemoveUserGroup(UserGroup userGroup);
}