using OpenSurveyBackend.Data.Repository;
using OpenSurveyBackend.Interfaces;

namespace OpenSurveyBackend.Data;

public class UnitOfWork: IUnitOfWork
{
    private readonly DataContext _dataContext;

    public UnitOfWork(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public IUserRepository UserRepository => new UserRepository(_dataContext);
    public ISurveyRepository SurveyRepository => new SurveyRepository(_dataContext);
    public IUserGroupRepository UserGroupRepository => new UserGroupRepository(_dataContext);
    public IUserGroupRelationRepository UserGroupRelationRepository => new UserGroupRelationRepository(_dataContext);

    public ISurveyUserGroupRelationRepository SurveyUserGroupRelationRepository =>
        new SurveyUserGroupRelationRepository(_dataContext);

    public ISurveyResponseRepository SurveyResponseRepository => new SurveyResponseRepository(_dataContext);

    public async Task<bool> SaveAsync() 
    {
        return await _dataContext.SaveChangesAsync() > 0;
    }
}