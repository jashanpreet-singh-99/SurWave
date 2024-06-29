using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OpenSurveyBackend.Dtos;
using OpenSurveyBackend.Interfaces;
using OpenSurveyBackend.Models;
using WebAPI.Errors;


namespace OpenSurveyBackend.Controllers;

public class SurveyController : BaseController
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;
    private readonly IEmailSender _emailSender;

    public SurveyController(IUnitOfWork uow, IMapper mapper, IEmailSender emailSender)
    {
        _uow = uow;
        _mapper = mapper;
        _emailSender = emailSender;
    }

    // Post api/survey/save
    [Authorize (Policy = "AdminPolicy")]
    [HttpPost("save")]
    public async Task<IActionResult> SaveSurvey([FromBody] SurveySaveDto surveyDto)
    {
        var survey = _mapper.Map<Survey>(surveyDto);
        _uow.SurveyRepository.AddSurvey(survey);
        await _uow.SaveAsync(); // Not the right way to do this
        if (surveyDto.UserGroups != null)
        {
            var userGroupIds = JsonConvert.DeserializeObject<int[]>(surveyDto.UserGroups);
            foreach (var userGroupId in userGroupIds)
            {
                var surveyUserGroupRelation = new SurveyUserGroupRelation
                {
                    UserGroupId = userGroupId,
                    SurveyId = survey.Id
                };
                _uow.SurveyUserGroupRelationRepository.AddUserGroupToSurvey(surveyUserGroupRelation);
            }
        }

        var surveyIdDto = new KeyValueSDto()
        {
            Value = survey.Id.ToString()
        };
        await _uow.SaveAsync();
        return Ok(surveyIdDto);
        // return Ok(survey);
    }
    
    // Post api/survey/edit/<id>
    [Authorize (Policy = "AdminPolicy")]
    [HttpPut("edit/{id:int}")]
    public async Task<IActionResult> EditSurvey( int id, [FromBody] SurveyEditDto surveyDto)
    {
        ApiError apiError1 = new ApiError(BadRequest().StatusCode, "Invalid request, information and option are not compatible");
        if (id != surveyDto.Id)
        {
            return BadRequest(apiError1);
        }

        var survey = await _uow.SurveyRepository.GetCompleteSurvey(id);
        if (survey == null)
        {
            return BadRequest(apiError1);
        }

        foreach (var question in survey.Questions!.ToList())
        {
            _uow.SurveyRepository.RemoveOptions(question.Options!);
            _uow.SurveyRepository.RemoveQuestion(question);
        }

        _uow.SurveyUserGroupRelationRepository.RemoveSurveyUserGroupEntries(id);
        // Update UserGroup relations
        if (surveyDto.UserGroups != null)
        {
            var userGroupIds = JsonConvert.DeserializeObject<int[]>(surveyDto.UserGroups);
            foreach (var userGroupId in userGroupIds)
            {
                var surveyUserGroupRelation = new SurveyUserGroupRelation
                {
                    UserGroupId = userGroupId,
                    SurveyId = survey.Id
                };
                _uow.SurveyUserGroupRelationRepository.AddUserGroupToSurvey(surveyUserGroupRelation);
            }
        }

        _mapper.Map(surveyDto, survey);
        //var surveyDb = _mapper.Map<Survey>(surveyDto);
        //_uow.SurveyRepository.UpdateSurvey(surveyDb);
        await _uow.SaveAsync();
        return StatusCode(202);
    }
    
    // Delete api/survey/delete/<id>
    // CASCADING issue
    [Authorize (Policy = "AdminPolicy")]
    [HttpDelete("delete/{id:int}")]
    public async Task<IActionResult> DeleteSurvey(int id)
    {
        ApiError apiError1 = new ApiError(BadRequest().StatusCode, "Survey Id provided is not valid");
        var survey = await _uow.SurveyRepository.GetSurvey(id);
        if (survey == null)
        {
            return BadRequest(apiError1);
        }
        _uow.SurveyRepository.DeleteSurvey(survey);
        await _uow.SaveAsync();
        return StatusCode(202);
    }
    
    // PATCH api/survey/publish
    [Authorize (Policy = "AdminPolicy")]
    [HttpPatch("publish")]
    public async Task<IActionResult> PublishSurvey([FromBody] SurveyPublishDto surveyDto)
    {
        ApiError apiError1 = new ApiError(BadRequest().StatusCode, "Survey Id provided is not valid");
        ApiError apiError2 = new ApiError(BadRequest().StatusCode, "Survey Already Published");
        ApiError apiError3 = new ApiError(BadRequest().StatusCode, "You are trying to publish an expired survey. The Deadline of the survey should be greater than the publish date.");
        var survey = await _uow.SurveyRepository.GetSurvey(surveyDto.Id);
        if (survey == null)
        {
            return BadRequest(apiError1);
        }
        if (survey.Published)
        {
            return BadRequest(apiError2);
        }

        if (survey.Deadline.Date <= survey.PublishedOn.Date)
        {
            return BadRequest(apiError3);
        }
        survey.Published = true;
        survey.PublishedOn = DateTime.Now;
        await _uow.SaveAsync();
        await Task.Run(() => SendEmailsAboutSurveyToUsers(survey));
        return StatusCode(202);
    }
    
    // Get api/survey/list
    [Authorize(Policy = "AdminPolicy")]
    [HttpGet("list")]
    public async Task<IActionResult> GetAllSurvey()
    {
        var surveys = await _uow.SurveyRepository.GetSurveys();
        var surveysDto = _mapper.Map<IEnumerable<SurveyListDto>>(surveys);
        return Ok(surveysDto);
    }
    
    // Get api/survey/user/list/
    [Authorize (Policy = "UserPolicy")]
    [HttpGet("user/list")]
    public async Task<IActionResult> GetUserSurvey()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var surveys = await _uow.SurveyUserGroupRelationRepository.GetSurveySpecificToUserId(short.Parse(userId));
        var surveysDto = _mapper.Map<IEnumerable<SurveyListDto>>(surveys);
        return Ok(surveysDto);
    }
    
    // Get api/survey/user/list/complete/status
    [Authorize (Policy = "UserPolicy")]
    [HttpGet("user/list/complete/status")]
    public async Task<IActionResult> GetUserSurveyStatus()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var surveys = await _uow.SurveyUserGroupRelationRepository.GetSurveySpecificToUserId(short.Parse(userId));
        var surveysDto = _mapper.Map<IEnumerable<SurveyListDto>>(surveys);
        var surveyStatus = _uow.SurveyUserGroupRelationRepository.GetSurveyCompletedStatus(surveysDto);
        return Ok(surveyStatus);
    }
    
    // Get api/survey/view/<id>
    [Authorize (Policy = "CommonPolicy")]
    [HttpGet("view/{surveyId:int}")]
    public async Task<IActionResult> ViewSurvey(int surveyId)
    {
        ApiError apiError1 = new ApiError(BadRequest().StatusCode, "You do not have the authorization to view this survey");
        ApiError apiError2 = new ApiError(BadRequest().StatusCode, "Invalid Survey Id");
        ApiError apiError3 = new ApiError(BadRequest().StatusCode, "Survey not yet Published");
        
        var userId = short.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var role = User.FindFirstValue(ClaimTypes.Role);
        if (!await _uow.UserGroupRelationRepository.GetUserCanAccessSurvey(userId, surveyId) && role != "Admin")
        {
            return BadRequest(apiError1);
        }
        var survey = await _uow.SurveyRepository.GetCompleteSurvey(surveyId);
        if (survey == null)
        {
            return BadRequest(apiError2);
        }

        if (!survey.Published)
        {
            return BadRequest(apiError3);
        }

        return Ok(survey);
    }
    
    // Get api/survey/edit/view/<id>
    [Authorize (Policy = "AdminPolicy")]
    [HttpGet("edit/view/{surveyId:int}")]
    public async Task<IActionResult> ViewSurveyForEdit(int surveyId)
    {
        ApiError apiError2 = new ApiError(BadRequest().StatusCode, "Invalid Survey Id");
        
        var survey = await _uow.SurveyRepository.GetCompleteSurvey(surveyId);
        if (survey == null)
        {
            return BadRequest(apiError2);
        }
        return Ok(survey);
    }
    
    // Post api/survey/response/submit
    [Authorize(Policy = "UserPolicy")]
    [HttpPost("response/submit")]
    public async Task<IActionResult> SubmitResponse([FromBody] SurveyResponseDto[] responseDtos)
    {
        ApiError apiError1 = new ApiError(BadRequest().StatusCode, "Blank request, no information found.");
        ApiError apiError2 = new ApiError(BadRequest().StatusCode, "Duplicate Submission not allowed. You already have a submission.");

        if (responseDtos.Length < 1)
        {
            return BadRequest(apiError1);
        }
        var userId = short.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var responseData = responseDtos.Select(
            responseDto => new SurveyResponse
            {
                UserId = userId,
                SurveyId = responseDto.SurveyId,
                QuestionId = responseDto.QuestionId,
                OptionId = responseDto.OptionId
            }).ToList();
        if (await _uow.SurveyResponseRepository.AlreadySubmitted(responseData[0]))
        {
            return BadRequest(apiError2);
        }
        _uow.SurveyResponseRepository.SaveResponses(responseData);
        await _uow.SaveAsync();
        return StatusCode(200);
    }
    
    // Post api/survey/response/question
    [Authorize(Policy = "AdminPolicy")]
    [HttpPost("response/question")]
    public async Task<IActionResult> QuestionResponses([FromBody] KeyValueSDto questionNoDto)
    {
        int questionNo = short.Parse(questionNoDto.Value!);
        var questionInfo = await _uow.SurveyResponseRepository.GetResultForQuestion(questionNo);
        return Ok(questionInfo);
    }
    
    // Post api/survey/response/rate
    [Authorize(Policy = "AdminPolicy")]
    [HttpPost("response/rate")]
    public async Task<IActionResult> ResponseRate([FromBody] KeyValueSDto surveyIdDto)
    {
        int surveyId = short.Parse(surveyIdDto.Value!);
        var totalResponses = await _uow.SurveyResponseRepository.GetTotalPossibleResponses(surveyId);
        var responseRate = new SurveyResponseRateDto
        {
            Total = 0,
            Responses = 0
        };
        if (totalResponses <= 0) return Ok(responseRate);
        var userResponses = await _uow.SurveyResponseRepository.GetTotalResponses(surveyId);
        responseRate.Total = totalResponses;
        responseRate.Responses = userResponses;
        return Ok(responseRate);
    }
    
    // Post api/survey/response/report
    [Authorize(Policy = "AdminPolicy")]
    [HttpPost("response/report")]
    public async Task<IActionResult> GetAllResponseReport([FromBody] KeyValueSDto surveyIdDto)
    {
        int surveyId = short.Parse(surveyIdDto.Value!);
        var surveyReport = await _uow.SurveyResponseRepository.GetAllResponseReport(surveyId);
        var surveyReportDto = _mapper.Map<IEnumerable<SurveyReportDto>>(surveyReport);
        return Ok(surveyReportDto);
    }

    // Post api/survey/question
    [Authorize(Policy = "UserPolicy")]
    [HttpPost("question")]
    public async Task<IActionResult> QuestionsOptions([FromBody] QuestionOnlyDto questionNoDto)
    {
        ApiError apiError1 = new ApiError(BadRequest().StatusCode, "User Not Authorized or No such survey.");
        ApiError apiError2 = new ApiError(BadRequest().StatusCode, "Question No provided is not valid for given survey and user combination.");
        var userId = short.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var survey = await _uow.SurveyUserGroupRelationRepository.UserAuthorizedSurvey(userId, questionNoDto.SurveyId);
        if (survey == null)
        {
            return BadRequest(apiError1);
        }

        var question = survey.Questions!.FirstOrDefault(quest => quest.Id == questionNoDto.QuestionId);
        if (question == null)
        {
            return BadRequest(apiError2);
        }

        return Ok(question);
    }

    private async void SendEmailsAboutSurveyToUsers(Survey survey)
    {
        var users = _uow.SurveyUserGroupRelationRepository.GetUsersLinkedToSurvey(survey.Id);
        Thread.Sleep(2000);
        foreach (var user in users)
        {
            Console.WriteLine("U : " + user.Id + " - " + user.UserName + " - " + user.Email);
            await _emailSender.SendSurveyEmailAsync(user.Email!, user.UserName!,  survey.Name!, "http://localhost:4200/survey/" + survey.Id);
        } 
    }
    
    // Get api/survey/response/count
    [Authorize(Policy = "AdminPolicy")]
    [HttpGet("response/count")]
    public async Task<IActionResult> GetTotalNumberOfResponses()
    {
        var count = await _uow.SurveyResponseRepository.GetTotalUserResponseCount();
        var countDto = new KeyValueSDto
        {
            Value = count.ToString()
        };
        return Ok(countDto);
    }
    
    // Get api/survey/end/soon/count
    [Authorize(Policy = "AdminPolicy")]
    [HttpGet("end/soon/count")]
    public async Task<IActionResult> GetCountOfSurveyEndingSoon()
    {
        var count = await _uow.SurveyRepository.GetCountOfEndingSoon();
        var countDto = new KeyValueSDto
        {
            Value = count.ToString()
        };
        return Ok(countDto);
    }
    
    // Get api/survey/active/count
    [Authorize(Policy = "AdminPolicy")]
    [HttpGet("active/count")]
    public async Task<IActionResult> GetActiveSurveys()
    {
        var count = await _uow.SurveyRepository.GetActiveSurveys();
        var countDto = new KeyValueSDto
        {
            Value = count.ToString()
        };
        return Ok(countDto);
    }
    
    // Get api/survey/question/count
    [Authorize(Policy = "CommonPolicy")]
    [HttpPost("question/count")]
    public IActionResult GetQuestionsCountForSurvey([FromBody] KeyValueSDto surveyIdDto)
    {
        var surveyId = short.Parse(surveyIdDto.Value!);
        var count = _uow.SurveyRepository.GetQuestionCount(surveyId);
        Console.WriteLine("Count : " + count);
        return Ok(new KeyValueSDto { Value = count.ToString() });
    }

}