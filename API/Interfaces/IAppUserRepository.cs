

using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Interfaces
{
    public interface IAppUserRepository : IRepository
    {
        void Update(AppUser user);
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);
        Task<IEnumerable<MemberDto>> GetMembersAsync();
        Task<MemberDto> GetMemberByUsernameAsync(string username);
    }
}