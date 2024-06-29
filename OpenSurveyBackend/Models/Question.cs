using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Models;

public class Question: BaseEntity
{

    [Required] public string? QuestionText { get; set; }
    [Required] public ICollection<Option>? Options { get; set; }

}