using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Models;

public class UserGroup: BaseEntity
{
    [Required] public string? GroupName { get; set; }
}