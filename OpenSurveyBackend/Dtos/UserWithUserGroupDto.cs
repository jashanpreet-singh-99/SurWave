namespace OpenSurveyBackend.Dtos;

public class UserWithUserGroupDto
{
    public UserListDto? User { get; set; }
    public int[]? UserGroups { get; set; }
}