using Microsoft.EntityFrameworkCore;
using OpenSurveyBackend.Interfaces;
using OpenSurveyBackend.Models;

namespace OpenSurveyBackend.Data.Repository;

public class SurveyRepository: ISurveyRepository
{
    private readonly DataContext _dataContext;

    public SurveyRepository(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<Survey?> GetSurvey(int id)
    {
        return await _dataContext.Surveys.FirstOrDefaultAsync(survey => survey.Id == id);
    }
    
    public async Task<Survey?> GetCompleteSurvey(int id)
    {
        return await _dataContext.Surveys.Include(survey => survey.Questions)!.ThenInclude(question => question.Options).FirstOrDefaultAsync(survey => survey.Id == id);
    }

    public async Task<IEnumerable<Survey>> GetSurveys()
    {
        return await _dataContext.Surveys.ToListAsync();
    }

    public void AddSurvey(Survey survey)
    {
        _dataContext.Surveys.Add(survey);
    }

    public void DeleteSurvey(Survey survey)
    {
        _dataContext.Surveys.Remove(survey);
    }

    public void UpdateSurvey(Survey survey)
    {
        _dataContext.Update(survey);
    }

    public async Task<int> GetCountOfEndingSoon()
    {
        var today = DateTime.Today;
        var threeDaysFromNow = today.AddDays(3);
        return await _dataContext.Surveys
            .Where(survey => survey.Deadline >= today && survey.Deadline <= threeDaysFromNow)
            .CountAsync();
    }

    public async Task<int> GetActiveSurveys()
    {
        return await _dataContext.Surveys
            .Where(survey => survey.Deadline >= DateTime.Now && survey.Published)
            .CountAsync();
    }

    public int GetQuestionCount(int surveyId)
    {
        return _dataContext.Surveys
            .Include(survey => survey.Questions).FirstOrDefault(survey => survey.Id == surveyId)!.Questions!.Count;
    }

    public void RemoveOptions(ICollection<Option> options)
    {
        _dataContext.Option.RemoveRange(options);
    }

    public void RemoveQuestion(Question question)
    {
        _dataContext.Questions.Remove(question);
    }

}