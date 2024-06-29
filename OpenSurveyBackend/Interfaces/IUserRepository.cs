using OpenSurveyBackend.Models;

namespace OpenSurveyBackend.Interfaces;

public interface IUserRepository
{
    Task<User?> Authenticate(string? email, string? password);
    void Register(string email, string password, string userName);
    Task<IEnumerable<User>> GetUsers();
    Task<IEnumerable<UserWithGroups>> GetUsersWithUserGroup();
    Task<User?> FindUser(int id);
    Task<User?> FindUserByEmail(string email);

    Task<bool> UserAlreadyExists(string email);
    Task<bool> ResetUserPassword(string email, string password);
    string GeneratePassword();

    Task<int> GetActiveUserCount();
}