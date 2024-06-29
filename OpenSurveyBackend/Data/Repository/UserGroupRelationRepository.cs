using Microsoft.EntityFrameworkCore;
using OpenSurveyBackend.Interfaces;
using OpenSurveyBackend.Models;

namespace OpenSurveyBackend.Data.Repository;

public class UserGroupRelationRepository: IUserGroupRelationRepository
{
    private readonly DataContext _dataContext;

    public UserGroupRelationRepository(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public void AddRelation(UserGroupRelation? userGroupRelation)
    {
        _dataContext.UserGroupsRelations.Add(userGroupRelation!);
    }
    
    public void RemoveRelation(UserGroupRelation? userGroupRelation)
    {
        _dataContext.UserGroupsRelations.Remove(userGroupRelation!);
    }

    public async Task<UserGroupRelation?> FindUserGroupRelation(int userId, int groupId)
    {
        return await _dataContext.UserGroupsRelations.FirstOrDefaultAsync(relation =>
            relation.UserId == userId && relation.UserGroupId == groupId);
    }
    
    public async Task<IEnumerable<UserGroup?>> GetUsersUserGroups(int userId)
    {
        return await _dataContext.UserGroupsRelations.Where(userGroup => userGroup.UserId == userId)
            .Select(userGroup => userGroup.UserGroup)
            .ToListAsync();
    }
    
    public async Task<IEnumerable<User?>> GetUsersInUserGroup(int groupId)
    {
        return await _dataContext.UserGroupsRelations.Where(userGroup => userGroup.UserGroupId == groupId)
            .Select(userGroup => userGroup.User)
            .ToListAsync();
    }

    public async Task<bool> GetUserCanAccessSurvey(int userId, int surveyId)
    {
        return await _dataContext.Users.Where(user => user.Id == userId)
            .Where(user => _dataContext.UserGroupsRelations
                .Where(ugr => _dataContext.SurveyUserGroupRelations
                    .Any(sgr => sgr.SurveyId == surveyId && sgr.UserGroupId == ugr.UserGroupId)
                )
                .Any(ugr => ugr.UserId == userId)
            ).AnyAsync();
    }
    
}