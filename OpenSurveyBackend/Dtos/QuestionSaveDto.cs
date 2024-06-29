using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Dtos;

public class QuestionSaveDto
{
    [Required] public string? QuestionText { get; set; }
    [Required] public ICollection<OptionSaveDto>? Options { get; set; }
}