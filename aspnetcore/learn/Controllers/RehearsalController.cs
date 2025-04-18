using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using aspnetcoreapp.Models;
using aspnetcoreapp.Data;

namespace aspnetcoreapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RehearsalController : ControllerBase
    {
        private readonly RehearsalContext _context;

        public RehearsalController(RehearsalContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rehearsal>>> Get()
        {
            return await _context.Rehearsals.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Rehearsal>> Post([FromBody] Rehearsal rehearsal)
        {
            _context.Rehearsals.Add(rehearsal);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = rehearsal.Id }, rehearsal);
        }
    }
} 