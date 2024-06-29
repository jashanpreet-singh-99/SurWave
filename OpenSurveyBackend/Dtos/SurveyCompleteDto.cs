using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Dtos;

public class SurveyCompleteDto: SurveyListDto
{
    [Required] public bool IsCompleted { get; set; }
}