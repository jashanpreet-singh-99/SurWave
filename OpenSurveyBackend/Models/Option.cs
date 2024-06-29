using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Models;

public class Option: BaseEntity
{
    [Required] public string? OptionText { get; set; }
}