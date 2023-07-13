using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Entities
{
    [ApiController]
    [Route("api/[controller]")]
    public class ErrorDispenserController : ControllerBase
    {
        private readonly DatingDbContext _context;
        public ErrorDispenserController(DatingDbContext context)
        {
            _context = context;

        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecrets()
        {
            return Ok("secret text");
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var thing = _context.AppUsers.Find(-1);

            if (thing == null) return NotFound();

            return Ok(thing);
        }

        [HttpGet("server-error")]
        public ActionResult<AppUser> GetServerError()
        {
            var thing = _context.AppUsers.Find(-1);

            var thingToReturn = thing.ToString();

            return Ok(thingToReturn);
        }

        [HttpGet("bad-request")]
        public ActionResult<AppUser> GetBadRequest()
        {
            return BadRequest("This is a bad request");
        }
    }
}