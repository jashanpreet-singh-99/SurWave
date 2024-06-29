using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Dtos;

public class SurveyResponseRateDto
{
    [Required] public int Total { get; set; }
    [Required] public int Responses { get; set; }
}