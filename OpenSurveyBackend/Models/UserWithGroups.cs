namespace OpenSurveyBackend.Models;

public class UserWithGroups
{
    public User? User { get; set; }
    public int[]? UserGroups { get; set; }
}