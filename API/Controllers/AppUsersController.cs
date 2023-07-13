using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Entities
{
    [Authorize]
    [Route("api/users")]
    public class AppUsersController : BaseApiController
    {
        private readonly IAppUserRepository _userRepository;
        private readonly IMapper _mapper;
        public AppUsersController(IAppUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetMembersAsync();
            return Ok(users);
        }

        [HttpGet("{name}")]
        public async Task<ActionResult<MemberDto>> GetUser(string name)
        {
            return await _userRepository.GetMemberByUsernameAsync(name);
        }
    }
}