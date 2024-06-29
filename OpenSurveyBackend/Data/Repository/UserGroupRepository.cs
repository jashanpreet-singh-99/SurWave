using Microsoft.EntityFrameworkCore;
using OpenSurveyBackend.Interfaces;
using OpenSurveyBackend.Models;

namespace OpenSurveyBackend.Data.Repository;

public class UserGroupRepository: IUserGroupRepository
{
    private readonly DataContext _dataContext;

    public UserGroupRepository(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<bool> UserGroupExist(string name)
    {
        return await _dataContext.UserGroups.AnyAsync(userGroup => userGroup.GroupName == name);
    }

    public void AddUserGroup(UserGroup userGroup)
    {
        _dataContext.UserGroups.Add(userGroup);
    }
    
    public void RemoveUserGroup(UserGroup userGroup)
    {
        _dataContext.UserGroups.Remove(userGroup);
    }

    public async Task<IEnumerable<UserGroup>> GetUserGroups()
    {
        return await _dataContext.UserGroups.ToListAsync();
    }

    public async Task<UserGroup?> GetUserGroup(int id)
    {
        return await _dataContext.UserGroups.FirstOrDefaultAsync(group => group.Id == id);
    }


}