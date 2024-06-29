using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Dtos;

public class LoginRespDto
{
    [Required]
    public string? Email { get; set; }
    [Required]
    public string? Token { get; set; }
    public string? UserName {get; set;}
    public string? RefreshToken { get; set; }
}