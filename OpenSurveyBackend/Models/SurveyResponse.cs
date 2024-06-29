using System.ComponentModel.DataAnnotations;

namespace OpenSurveyBackend.Models;

public class SurveyResponse: BaseEntity
{
    [Required] public int UserId { get; set; } 
    public User? User { get; set; }
    
    [Required] public int SurveyId { get; set; }
    public Survey? Survey { get; set; }
    
    [Required] public int QuestionId { get; set; }
    public Question? Question { get; set; }
    
    [Required] public int OptionId { get; set; }
    public Option? Option { get; set; }
}