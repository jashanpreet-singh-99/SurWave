using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Models;

public class SurveyUserGroupRelation: BaseEntity
{
    [Required] public int SurveyId { get; set; }
    [Required] public Survey? Survey { get; set; }
    [Required] public int UserGroupId { get; set; }
    [Required] public UserGroup? UserGroup { get; set; }
}