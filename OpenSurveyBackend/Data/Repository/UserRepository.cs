using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using OpenSurveyBackend.Interfaces;
using OpenSurveyBackend.Models;

namespace OpenSurveyBackend.Data.Repository;

public class UserRepository : IUserRepository
{
    private readonly DataContext _dataContext;

    public UserRepository(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<User?> Authenticate(string? email, string? passwordText)
    {
        var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.Email == email);
        if (user?.Password == null || user.PasswordKey == null || string.IsNullOrEmpty(passwordText))
        {
            return null;
        }
        return MatchPassword(passwordText, user.Password, user.PasswordKey) ? user : null;
    }

    private static bool MatchPassword(string passwordText, byte[] password, byte[] passwordKey)
    {
        using var hmac = new HMACSHA512(passwordKey);
        var passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(passwordText));

        return !passwordHash.Where((t, i) => t != password[i]).Any();
    }

    public void Register(string email, string password, string userName)
    {
        using var hmac = new HMACSHA512();
        var passwordKey = hmac.Key;
        var passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

        var user = new User()
        {
            Email = email,
            Password = passwordHash,
            PasswordKey = passwordKey,
            Role = "User",
            UserName = userName,
            IsActive = true
        };

        _dataContext.Users.Add(user);
    }

    public async Task<bool> ResetUserPassword(string email, string password)
    {
        var user = await _dataContext.Users.FirstOrDefaultAsync(user => user.Email == email);
        if (user is not { IsActive: true })
        {
            return false;
        }
        using var hmac = new HMACSHA512();
        var passwordKey = hmac.Key;
        var passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        user.PasswordKey = passwordKey;
        user.Password = passwordHash;
        return true;
    }

    public async Task<IEnumerable<User>> GetUsers()
    {
        // Ensure the admin is not listed in the list
        return (await _dataContext.Users.ToListAsync()).Where(user => user.Email != "Administrator");
    }

    public async Task<User?> FindUser(int id)
    {
        return await _dataContext.Users.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<User?> FindUserByEmail(string email)
    {
        return await _dataContext.Users.FirstOrDefaultAsync(x => x.Email == email);
    }

    public async Task<bool> UserAlreadyExists(string email)
    {
        return await _dataContext.Users.AnyAsync(x => x.Email == email);
    }

    public async Task<IEnumerable<UserWithGroups>> GetUsersWithUserGroup()
    {
        // Ensure the admin is not listed in the list
        return (await _dataContext.Users.GroupJoin(
    _dataContext.UserGroupsRelations,
    user => user.Id,
    relation => relation.UserId,
    (user, relations) => new { user, relations }).SelectMany(
    join => join.relations.DefaultIfEmpty(),
    (join, relation) => new { join.user, relation }).GroupBy(
    temp => temp.user.Id).Select(groups => new UserWithGroups{
    User = groups.First().user,
    UserGroups = groups.Where(ur => ur.relation != null).Select(ur => ur.relation!.UserGroupId).ToArray()}).ToListAsync()).Where(user => user.User?.Email != "Administrator");
    }

    public string GeneratePassword()
    {
        var length = 14;
        const string validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()";
        var res = new StringBuilder();
        var rnd = new Random();
        while (0 < length--)
        {
            res.Append(validChars[rnd.Next(validChars.Length)]);
        }
        return res.ToString();
    }

    public async Task<int> GetActiveUserCount()
    {
        return await _dataContext.Users.Where(user => user.Role == "User" && user.IsActive).CountAsync();
    }
}