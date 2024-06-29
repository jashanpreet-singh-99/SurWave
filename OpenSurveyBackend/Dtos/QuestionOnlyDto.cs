using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Dtos;

public class QuestionOnlyDto
{
    [Required] public int QuestionId { get; set; }
    [Required] public int SurveyId { get; set; }
}