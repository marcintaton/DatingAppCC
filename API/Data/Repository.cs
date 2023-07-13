using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Interfaces;

namespace API.Data
{
    public abstract class Repository : IRepository
    {
        protected readonly DatingDbContext _context;
        public Repository(DatingDbContext context)
        {
            _context = context;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}