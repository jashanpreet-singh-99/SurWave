using Microsoft.EntityFrameworkCore;
using OpenSurveyBackend.Dtos;
using OpenSurveyBackend.Interfaces;
using OpenSurveyBackend.Models;

namespace OpenSurveyBackend.Data.Repository;

public class SurveyUserGroupRelationRepository : ISurveyUserGroupRelationRepository
{
    private readonly DataContext _dataContext;

    public SurveyUserGroupRelationRepository(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public void AddUserGroupToSurvey(SurveyUserGroupRelation surveyUserGroupRelation)
    {
        _dataContext.SurveyUserGroupRelations.Add(surveyUserGroupRelation);
    }

    public async Task<IEnumerable<Survey?>> GetSurveySpecificToUserId(int userId)
    {
        return await _dataContext.Surveys
            .Where(survey => survey.Published)
            .Join( // Survey relation with survey
                _dataContext.SurveyUserGroupRelations,
                survey => survey.Id,
                relation => relation.SurveyId,
                (survey, relation) => new { Survey = survey, SurveyUserGroupRelation = relation }
            ).Join( // Prev join with userGroupRelation
                _dataContext.UserGroupsRelations,
                sRelation => sRelation.SurveyUserGroupRelation.UserGroupId,
                uRelation => uRelation.UserGroupId,
                (sRelation, uRelation) => new { sRelation.Survey, uRelation.UserGroupId }
            ).Where( // PRev join get survey that match the userID
                join => _dataContext.UserGroupsRelations.Any(
                    uRelation => uRelation.UserId == userId &&
                                 uRelation.UserGroupId == join.UserGroupId)
            ).Select(
                join => join.Survey
            ).Distinct()
            .ToListAsync();
    }

    public IEnumerable<SurveyCompleteDto> GetSurveyCompletedStatus(IEnumerable<SurveyListDto> surveys)
    {
        return surveys
            .Select(survey => new SurveyCompleteDto
            {
                Id = survey.Id,
                Name = survey.Name,
                Description = survey.Description,
                Published = survey.Published,
                PublishedOn = survey.PublishedOn,
                Deadline = survey.Deadline,
                IsCompleted = _dataContext.SurveyResponses.Any(r => r.SurveyId == survey.Id)
            }).ToList();
    }
    
    

    public async Task<Survey?> UserAuthorizedSurvey(int userId, int surveyId)
    {
        return await _dataContext.Surveys.Include(survey => survey.Questions)!.ThenInclude(question => question.Options).Join( // Survey relation with survey
            _dataContext.SurveyUserGroupRelations,
            survey => survey.Id,
            relation => relation.SurveyId,
            (survey, relation) => new { Survey = survey, SurveyUserGroupRelation = relation }
        ).Join( // Prev join with userGroupRelation
            _dataContext.UserGroupsRelations,
            sRelation => sRelation.SurveyUserGroupRelation.UserGroupId,
            uRelation => uRelation.UserGroupId,
            (sRelation, uRelation) => new { sRelation.Survey, uRelation.UserGroupId }
        ).Where( // PRev join get survey that match the userID
            join => _dataContext.UserGroupsRelations.Any(
                uRelation => uRelation.UserId == userId &&
                             uRelation.UserGroupId == join.UserGroupId)
        ).Select(
            join => join.Survey
        ).Distinct().FirstOrDefaultAsync(survey => survey.Id == surveyId);
    }

    //public List<User> GetUsersLinkedToSurvey(int surveyId)
    public List<User> GetUsersLinkedToSurvey(int surveyId)
    {
        var allowedUserId = _dataContext.SurveyUserGroupRelations
            .Where(sr => sr.SurveyId == surveyId)
            .Select(sr => sr.UserGroupId)
            .Join(
                _dataContext.UserGroupsRelations,
                sg => sg,
                ugr => ugr.UserGroupId,
                (sg, ugr) => ugr.UserId).Distinct();
        // return allowedUserId;
        Console.WriteLine(allowedUserId);
        return _dataContext.Users
            .Where(u => allowedUserId.Contains(u.Id))
            .ToList();
    }
    
    public void RemoveSurveyUserGroupEntries(int surveyId)
    {
        var userGroupRecords = _dataContext.SurveyUserGroupRelations
            .Where(sug => sug.SurveyId == surveyId);
        _dataContext.SurveyUserGroupRelations.RemoveRange(userGroupRecords);
    }

}