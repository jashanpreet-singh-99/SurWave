using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Dtos;

public class LoginReqDto
{
    [Required]
    public string? Email { get; set; }
    public string? Password { get; set; }
    [Required]
    public string? UserName { get; set; }
    
    
}