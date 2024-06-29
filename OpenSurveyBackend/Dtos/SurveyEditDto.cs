using System.ComponentModel.DataAnnotations;
using OpenSurveyBackend.Models;

namespace OpenSurveyBackend.Dtos;

public class SurveyEditDto
{
    [Required] public int Id { get; set; }
    [Required] public string? Name { get; set; }
    [Required] public string? Description { get; set; }
    [Required] public DateTime Deadline { get; set; }
    [Required] public ICollection<Question>? Questions { get; set; }
    public string? UserGroups { get; set; }
}