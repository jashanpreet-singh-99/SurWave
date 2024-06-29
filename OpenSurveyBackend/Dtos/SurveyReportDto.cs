using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Dtos;

public class SurveyReportDto
{
        [Required] public int UserId { get; set; }
        [Required] public int SurveyId { get; set; }
        [Required] public int QuestionId { get; set; }
        [Required] public int OptionId { get; set; }
}