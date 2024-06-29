using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Dtos;

public class SurveyPublishDto
{
    [Required] public int Id { get; set; }
}