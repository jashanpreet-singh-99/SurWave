using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Dtos;

public class SurveyResponseDto
{
    [Required] public int SurveyId { get; set; }
    [Required] public int QuestionId { get; set; }
    [Required] public int OptionId { get; set; }
}