using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Dtos;

public class UserInfo
{
    [Required]
    public string? Email { get; set; }
     
}