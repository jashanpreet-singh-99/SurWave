using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Dtos;

public class SurveyListDto
{
    [Required] public int Id { get; set; }
    [Required] public string? Name { get; set; }
    [Required] public bool Published { get; set; }
    [Required] public string? Description { get; set; }
    [Required] public DateTime PublishedOn { get; set; }
    [Required] public DateTime Deadline { get; set; }
}