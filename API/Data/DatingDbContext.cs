using API.Controllers;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DatingDbContext : DbContext
    {
        public DbSet<AppUser> AppUsers { get; set; }

        public DatingDbContext(DbContextOptions options) : base(options) { }

    }
}