using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Dtos;

public class UserGroupAddDto
{
    [Required] public string? UserEmail { get; set; } 
    [Required] public int Id { get; set; } 
}