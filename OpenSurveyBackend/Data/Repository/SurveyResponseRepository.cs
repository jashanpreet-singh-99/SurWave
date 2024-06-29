using Microsoft.EntityFrameworkCore;
using OpenSurveyBackend.Dtos;
using OpenSurveyBackend.Interfaces;
using OpenSurveyBackend.Models;

namespace OpenSurveyBackend.Data.Repository;

public class SurveyResponseRepository: ISurveyResponseRepository
{
    private readonly DataContext _dataContext;

    public SurveyResponseRepository(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public void SaveResponses(List<SurveyResponse> surveyResponses)
    {
        _dataContext.SurveyResponses.AddRange(surveyResponses);
    }

    public async Task<bool> AlreadySubmitted(SurveyResponse surveyResponse)
    {
        return await _dataContext.SurveyResponses.AnyAsync(
            resp =>
                resp.UserId == surveyResponse.UserId && 
                resp.SurveyId == surveyResponse.SurveyId && 
                resp.QuestionId == surveyResponse.QuestionId);
    }

    public async Task<IEnumerable<QuestionResponseDto>> GetResultForQuestion(int questionId)
    {
        return await _dataContext.Questions.Include(question => question.Options)
            .Where(ques => ques.Id == questionId)
            .SelectMany(ques => ques.Options!)
            .Select(option => new QuestionResponseDto 
            { 
                OptionText = option.OptionText, 
                OptionCount = _dataContext.SurveyResponses.Count(resp => resp.OptionId == option.Id) 
            })
            .ToListAsync();
    }

    public async Task<int> GetTotalPossibleResponses(int surveyId)
    {
        return await _dataContext.SurveyUserGroupRelations
            .Where(sr => sr.SurveyId == surveyId)
            .Join(
                _dataContext.UserGroupsRelations,
                sr => sr.UserGroupId,
                ugr => ugr.UserGroupId,
                (sr, ugr) => ugr.UserId
            ).Distinct().CountAsync();
    }
    
    public async Task<int> GetTotalResponses(int surveyId)
    {
        return await _dataContext.SurveyResponses
            .Where(sr => sr.SurveyId == surveyId)
            .Select(sr => sr.UserId)
            .Distinct().CountAsync();
    }

    public async Task<IEnumerable<SurveyResponse>> GetAllResponseReport(int surveyId)
    {
        return await _dataContext.SurveyResponses.Where(sr => sr.SurveyId == surveyId).ToListAsync();
    }

    public async Task<int> GetTotalUserResponseCount()
    {
        return await _dataContext.SurveyResponses
            .GroupBy(ur => new { ur.UserId, ur.SurveyId })
            .CountAsync();
    }
}