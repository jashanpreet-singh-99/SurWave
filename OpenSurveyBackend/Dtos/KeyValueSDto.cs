using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Dtos;

public class KeyValueSDto
{
    [Required] public string? Value { get; set; }
}