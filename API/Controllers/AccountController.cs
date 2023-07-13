using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Entities
{
    public class AccountController : BaseApiController
    {
        private readonly DatingDbContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DatingDbContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<AppUser>> Register(RegisterDto registerInfo)
        {
            if (await UserExists(registerInfo.Username))
                return BadRequest("Username is taken");

            using var hmac = new HMACSHA512();


            var user = new AppUser
            {
                UserName = registerInfo.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerInfo.Password)),
                PasswordSalt = hmac.Key
            };

            _context.AppUsers.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
            });
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<AppUser>> Login(LoginDto loginInfo)
        {
            var user = await _context.AppUsers.FirstOrDefaultAsync(u => u.UserName == loginInfo.Username.ToLower());

            if (user == null) return Unauthorized("Invalid username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var pwdMatch = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginInfo.Password));

            if (pwdMatch.Length != user.PasswordHash.Length) return Unauthorized("Invalid password");

            for (int i = 0; i < pwdMatch.Length; i++)
            {
                if (pwdMatch[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return Ok(new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
            });
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.AppUsers.AnyAsync(user => user.UserName.ToLower() == username.ToLower());
        }
    }
}