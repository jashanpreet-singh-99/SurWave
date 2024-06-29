using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Dtos;

public class UserGroupDto
{
    [Required] public int UserId { get; set; } 
    [Required] public int UserGroupId { get; set; } 
}