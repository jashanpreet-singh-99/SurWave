using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Dtos;

public class OptionSaveDto
{
    [Required] public string? OptionText { get; set; }
}