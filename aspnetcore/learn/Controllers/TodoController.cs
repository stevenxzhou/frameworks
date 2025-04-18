using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using aspnetcoreapp.Models;
using aspnetcoreapp.Data;

namespace aspnetcoreapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoController(TodoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> Get()
        {
            return await _context.TodoItems.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<TodoItem>> Post([FromBody] TodoItem todoItem)
        {
            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = todoItem.Id }, todoItem);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] TodoItem todoItem)
        {
            var todoToUpdate = await _context.TodoItems.FindAsync(todoItem.Id);

            if (todoToUpdate == null)
            {
                return NotFound();
            }

            todoToUpdate.Text = todoItem.Text;
            todoToUpdate.Completed = todoItem.Completed;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var todoToDelete = await _context.TodoItems.FindAsync(id);
            
            if (todoToDelete == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todoToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}