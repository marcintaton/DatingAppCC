
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AppUserRepository : Repository, IAppUserRepository
    {
        private readonly IMapper _mapper;
        public AppUserRepository(DatingDbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.AppUsers.Include(p => p.Photos).ToListAsync();
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.AppUsers.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.AppUsers.Include(p => p.Photos).SingleOrDefaultAsync(x => x.UserName.ToLower() == username.ToLower());
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

        public async Task<IEnumerable<MemberDto>> GetMembersAsync()
        {
            return await _context.AppUsers
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<MemberDto> GetMemberByUsernameAsync(string username)
        {
            return await _context.AppUsers.Where(x => x.UserName.ToLower() == username.ToLower())
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();

        }
    }
}