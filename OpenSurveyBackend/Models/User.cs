using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Models;

public class User: BaseEntity
{
    [Required] public string? Email { get; set;}
    [Required] public string? UserName { get; set; }
    [Required] public bool IsActive { get; set; } = true;
    [Required] public string? Role { get; set;}
    [Required] public byte[]? Password { get; set; }
    [Required] public byte[]? PasswordKey { get; set; }
}