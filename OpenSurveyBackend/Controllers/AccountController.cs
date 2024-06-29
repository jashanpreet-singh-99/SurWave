using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OpenSurveyBackend.Dtos;
using OpenSurveyBackend.Interfaces;
using OpenSurveyBackend.Models;
using WebAPI.Errors;

namespace OpenSurveyBackend.Controllers;

public class AccountController : BaseController
{
    private readonly IUnitOfWork _uow;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;
    private readonly IEmailSender _emailSender;

    public AccountController(IUnitOfWork uow, IConfiguration configuration, IMapper mapper, IEmailSender emailSender)
    {
        _uow = uow;
        _configuration = configuration;
        _mapper = mapper;
        _emailSender = emailSender;
    }

    // Post api/account/login
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginReqDto loginReq)
    {
        var user = await _uow.UserRepository.Authenticate(loginReq.Email, loginReq.Password);
        ApiError apiError1 = new ApiError(Unauthorized().StatusCode, "Invalid email or password");
        ApiError apiError2 = new ApiError(Unauthorized().StatusCode, "User access revoked by the administrator", "Plz contact the admin for more info");

        if (user == null)
        {
            
            return Unauthorized(apiError1);
        }

        if (!user.IsActive)
        {
           
            return Unauthorized(apiError2);
        }

        var loginResp = new LoginRespDto
        {
            Email = user.Email,
            Token = CreateJwt(user),
            UserName = user.UserName,
            RefreshToken = GenerateRefreshToken(user.Id)
        };
        return Ok(loginResp);
    }
    
    // Post api/account/refresh
    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshJwtToken([FromBody] TokenDto tokenDto)
    {
        int userId;
        try
        {
            userId = short.Parse(GetClaimFromJwt(tokenDto.Token!)!);
        }
        catch (Exception e)
        {
            Console.WriteLine(tokenDto.Token! + " - " + tokenDto.RefreshToken!);
            Console.WriteLine(e);
            return BadRequest("Invalid Jwt Token");
        }

        var resp = CheckValidityOfRefreshToken(userId, tokenDto.RefreshToken!);
        if (!resp)
        {
            return new OkObjectResult(BadRequest("Invalid refresh token."));
        }

        User? user = await _uow.UserRepository.FindUser(userId);
        if (user == null)
        {
            return BadRequest("Invalid jwt token.");
        }
        var kp = new KeyValueSDto
        {
            Value = CreateJwt(user)
        };
        return Ok(kp);
    }
    
    // Post api/account/password/resend
    [HttpPost("password/resend")]
    public async Task<IActionResult> ResendPassword([FromBody] KeyValueSDto emailValue)
    {
        var password = _uow.UserRepository.GeneratePassword();
        if (!await _uow.UserRepository.ResetUserPassword(emailValue.Value!, password))
        {
            return BadRequest("Invalid email, no active user with provided email address found.");
        }
        await _emailSender.SendResetEmailAsync(emailValue.Value!, password);
        await _uow.SaveAsync();
        return StatusCode(201);
    }

    // Post api/account/register
    [Authorize (Policy = "AdminPolicy")]
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] LoginReqDto loginReq)
    {
        if (string.IsNullOrEmpty(loginReq.Email?.Trim()) || string.IsNullOrEmpty(loginReq.UserName?.Trim()))
        {
            return BadRequest("Empty Fields found. plz send a valid request again");
        }

        if (await _uow.UserRepository.UserAlreadyExists(loginReq.Email))
        {
            return BadRequest("User already exist with the given email address.");
        }

        var password = _uow.UserRepository.GeneratePassword();
        _uow.UserRepository.Register(loginReq.Email, password, loginReq.UserName);
        await _emailSender.SendEmailAsync(loginReq.Email, password);
        await _uow.SaveAsync();
        return StatusCode(201);
    }
    
    // Get api/account/list
    [Authorize (Policy = "AdminPolicy")]
    [HttpGet("list")]
    public async Task<IActionResult> ListUsers()
    {
        var users = await _uow.UserRepository.GetUsers();
        var usersListDto = _mapper.Map<IEnumerable<UserListDto>>(users);
        return Ok(usersListDto);
    }
    
    // Get api/account/list/complete
    [Authorize (Policy = "AdminPolicy")]
    [HttpGet("list/complete")]
    public async Task<IActionResult> WithUserGroups()
    {
        var users = await _uow.UserRepository.GetUsersWithUserGroup();
        var usersDto = _mapper.Map<IEnumerable<UserWithUserGroupDto>>(users);
        return Ok(usersDto);
    }
    
    // Patch api/account/deactivate
    [Authorize (Policy = "AdminPolicy")]
    [HttpPatch("deactivate")]
    public async Task<IActionResult> DeactivateUser([FromBody] UserInfo userInfo)
    {
        if (userInfo.Email == null){
            return BadRequest("User not found");
        }
        var user = await _uow.UserRepository.FindUserByEmail(userInfo.Email);
        if (user == null)
        {
            return BadRequest("Requested userId is not a valid one, try again.");
        }
        user.IsActive = false;
        await _uow.SaveAsync();
        return StatusCode(204);
    }
    
    // Patch api/account/activate/<id>
    [Authorize (Policy = "AdminPolicy")]
    [HttpPatch("activate")]
    public async Task<IActionResult> ActivateUser([FromBody] UserInfo userInfo)
    {
       if (userInfo.Email == null){
            return BadRequest("User not found");
        }
        var user = await _uow.UserRepository.FindUserByEmail(userInfo.Email);
        if (user == null)
        {
            return BadRequest("Requested userId is not a valid one, try again.");
        }
        user.IsActive = true;
        await _uow.SaveAsync();
        return StatusCode(204);
    }

    private string? CreateJwt(User user)
    {
        var secretKey = _configuration.GetSection("AppSettings:Key").Value;
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey!));

        if (user is not { Email: not null, Role: not null }) return null;
        var claims = new[] {
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
        };

        var signingCredentials = new SigningCredentials(
            key, SecurityAlgorithms.HmacSha256
        );

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(2),
            SigningCredentials = signingCredentials
        };

        var tokenHandler = new JwtSecurityTokenHandler();

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }

    private string? GetClaimFromJwt(string token)
    {
        var handler = new JwtSecurityTokenHandler();
        var tokenS = handler.ReadToken(token) as JwtSecurityToken;

        var userIdClaim = tokenS?.Claims.FirstOrDefault(c => string.Equals(c.Type, "nameid", StringComparison.OrdinalIgnoreCase));
        return userIdClaim?.Value;
    }
    
    // Custom algo to encrypt userID and exp date 
    private string GenerateRefreshToken(int userId)
    {
        var secretKey = _configuration.GetSection("AppSettings:Key").Value;
        var exp = DateTime.Now.AddDays(30);
    
        var plainBytes = Encoding.UTF8.GetBytes(userId + "__" + exp);
        var keyBytes = Encoding.UTF8.GetBytes(secretKey!);
        
        var encryptedBytes = new byte[plainBytes.Length];
        for (var i = 0; i < plainBytes.Length; i++)
        {
            encryptedBytes[i] = (byte)(plainBytes[i] ^ keyBytes[i % keyBytes.Length]);
        }
        
        return Convert.ToBase64String(encryptedBytes);
    }
    
    // Custom Algo to decrypt userID and exp Date and verify the credibility
    private bool CheckValidityOfRefreshToken(int userId, string token)
    // private string CheckValidityOfRefreshToken(int userId, string token)
    {
        var secretKey = _configuration.GetSection("AppSettings:Key").Value;
    
        var encryptedBytes = Convert.FromBase64String(token);
        var keyBytes = Encoding.UTF8.GetBytes(secretKey!);
        
        var plainBytes = new byte[encryptedBytes.Length];
        for (var i = 0; i < encryptedBytes.Length; i++)
        {
            plainBytes[i] = (byte)(encryptedBytes[i] ^ keyBytes[i % keyBytes.Length]);
        }
    
        var decodedToken = Encoding.UTF8.GetString(plainBytes);
    
        var tokenContent = decodedToken.Split("__");
        var userIdResp = short.Parse(tokenContent[0]);
        var expDate = DateTime.Parse(tokenContent[1]);
        if (userIdResp != userId)
        {
            return false;
        }
        return expDate >= DateTime.Now;
        // return decodedToken;
    }
    
    
    // Post api/account/test/email
    [HttpPost("test/email")]
    public async Task<IActionResult> SendEmailTest([FromBody] KeyValueSDto valueDto)
    {
        await _emailSender.SendEmailAsync("open.survey@hottempmail.cc", "password");
        return StatusCode(200);
    }
    
    // Get api/account/count
    [Authorize(Policy = "AdminPolicy")]
    [HttpGet("count")]
    public async Task<IActionResult> GetActiveUserCount()
    {
        var count = await _uow.UserRepository.GetActiveUserCount();
        var countDto = new KeyValueSDto
        {
            Value = count.ToString()
        };
        return Ok(countDto);
    }
}