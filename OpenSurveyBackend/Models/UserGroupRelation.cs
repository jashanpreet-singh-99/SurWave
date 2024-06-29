using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Models;

public class UserGroupRelation: BaseEntity
{
    [Required] public int UserId { get; set; }
    [Required] public User? User { get; set; }
    [Required] public int UserGroupId { get; set; }
    [Required] public UserGroup? UserGroup { get; set; }
}