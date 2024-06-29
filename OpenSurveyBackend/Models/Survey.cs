using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Models;

public class Survey : BaseEntity
{
    [Required] public string? Name { get; set; }
    [Required] public bool Published { get; set; }
    [Required] public string? Description { get; set; }
    [Required] public DateTime PublishedOn { get; set; }
    [Required] public DateTime Deadline { get; set; }
    [Required] public ICollection<Question>? Questions { get; set; }
}