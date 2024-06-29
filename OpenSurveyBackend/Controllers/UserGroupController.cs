using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenSurveyBackend.Dtos;
using OpenSurveyBackend.Interfaces;
using OpenSurveyBackend.Models;

namespace OpenSurveyBackend.Controllers;

[Authorize(Policy = "AdminPolicy")]
public class UserGroupController : BaseController
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public UserGroupController(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }

    // Post api/usergroup/create
    [HttpPost("create")]
    public async Task<IActionResult> CreateUserGroup([FromBody] KeyValueSDto groupDto)
    {
        if (await _uow.UserGroupRepository.UserGroupExist(groupDto.Value!))
        {
            return BadRequest("UserGroup already exist with the given information.");
        }
        var userGroup = _mapper.Map<UserGroup>(groupDto);
        if (userGroup == null)
        {
            return BadRequest("Mapping Issue: check the key-value pair info");
        }
        _uow.UserGroupRepository.AddUserGroup(userGroup);
        await _uow.SaveAsync();
        // return Ok(userGroup);
        return StatusCode(202);
    }

    // Get api/usergroup/list
    [HttpGet("list")]
    public async Task<IActionResult> GetAllUserGroup()
    {
        var userGroups = await _uow.UserGroupRepository.GetUserGroups();
        return Ok(userGroups);
    }

    // Post api/usergroup/add/user
    [HttpPost("add/user")]
    public async Task<IActionResult> AddUserToUserGroup([FromBody] UserGroupAddDto userGroupDto)
    {
        if (userGroupDto == null)
        {
            return BadRequest("userGroupDto is null");
        }

        if (_uow == null || _uow.UserRepository == null)
        {
            return BadRequest("_uow or UserRepository is null");
        }

        var user = await _uow.UserRepository.FindUserByEmail(userGroupDto.UserEmail!);

        if (user == null)
        {
            return BadRequest("Invalid email user doesnt exist");
        }

        var userGroupRelation = new UserGroupRelation
        {
            UserId = user.Id,
            UserGroupId = userGroupDto.Id
        };

        if (_uow.UserGroupRelationRepository == null)
        {
            return BadRequest("UserGroupRelationRepository is null");
        }

        _uow.UserGroupRelationRepository.AddRelation(userGroupRelation);
        await _uow.SaveAsync();

        return StatusCode(202);

    }

    // Delete api/usergroup/remove/user
    [HttpDelete("remove/user")]
    public async Task<IActionResult> RemoveUserFromUserGroup([FromQuery] UserGroupAddDto userGroupDto)
    {
        var user = await _uow.UserRepository.FindUserByEmail(userGroupDto.UserEmail!);
        if (user == null){
            return BadRequest("User not found");
        }
        var userId = user.Id;
        var userGroupRelation = await
            _uow.UserGroupRelationRepository.FindUserGroupRelation(userId, userGroupDto.Id);
        if (userGroupRelation == null)
        {
            return BadRequest("No such User and UserGroup relation found");
        }
        _uow.UserGroupRelationRepository.RemoveRelation(userGroupRelation);
        await _uow.SaveAsync();
        // return Ok(userGroupRelation);
        return StatusCode(202);
    }

    // Delete api/usergroup/remove
    [HttpDelete("remove")]
    public async Task<IActionResult> RemoveUserGroup([FromBody] KeyValueSDto userGroupDto)
    {
        var userGroup = await _uow.UserGroupRepository.GetUserGroup(Int16.Parse(userGroupDto.Value!));
        if (userGroup == null)
        {
            return BadRequest("No such user group found");
        }
        _uow.UserGroupRepository.RemoveUserGroup(userGroup);
        await _uow.SaveAsync();
        // return Ok(userGroupRelation);
        return StatusCode(202);
    }

    // Patch api/usergroup/edit
    [HttpPatch("edit")]
    public async Task<IActionResult> EditUserGroup([FromBody] UserGroup userGroupDto)
    {
        var userGroup = await _uow.UserGroupRepository.GetUserGroup(userGroupDto.Id);
        if (userGroup == null)
        {
            return BadRequest("No such user group found");
        }

        userGroup.GroupName = userGroupDto.GroupName;
        await _uow.SaveAsync();
        // return Ok(userGroupRelation);
        return StatusCode(202);
    }

    // Get api/usergroup/list/user/<id>
    [HttpGet("list/user/{id:int}")]
    public async Task<IActionResult> ListUsersUserGroup(int id)
    {
        var userGroups = await _uow.UserGroupRelationRepository.GetUsersUserGroups(id);
        return Ok(userGroups);
    }

    // Get api/usergroup/list/group/<id>
    [HttpGet("list/group/{id:int}")]
    public async Task<IActionResult> ListUsersInUserGroup(int id)
    {
        var users = await _uow.UserGroupRelationRepository.GetUsersInUserGroup(id);
        var usersDto = _mapper.Map<IEnumerable<UserListDto>>(users);
        return Ok(usersDto);
    }

}