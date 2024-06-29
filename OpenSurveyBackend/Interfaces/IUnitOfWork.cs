namespace OpenSurveyBackend.Interfaces;

public interface IUnitOfWork
{
    IUserRepository UserRepository { get;}
    ISurveyRepository SurveyRepository { get; }
    IUserGroupRepository UserGroupRepository { get; }
    
    IUserGroupRelationRepository UserGroupRelationRepository { get; }

    ISurveyUserGroupRelationRepository SurveyUserGroupRelationRepository { get; }
    
    ISurveyResponseRepository SurveyResponseRepository { get; }

    Task<bool> SaveAsync();
}