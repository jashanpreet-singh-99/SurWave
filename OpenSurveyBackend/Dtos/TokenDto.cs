using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Dtos;

public class TokenDto
{
    [Required] public string? Token { get; set; }
    [Required] public string? RefreshToken { get; set; }
}