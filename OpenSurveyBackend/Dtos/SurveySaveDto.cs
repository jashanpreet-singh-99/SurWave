using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Dtos;

public class SurveySaveDto
{
    [Required] public string? Name { get; set; }
    [Required] public string? Description { get; set; }
    public string? UserGroups { get; set; }
    [Required] public DateTime Deadline { get; set; }
    [Required] public ICollection<QuestionSaveDto>? Questions { get; set; }
}