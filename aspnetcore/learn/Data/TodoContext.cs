using Microsoft.EntityFrameworkCore;
using aspnetcoreapp.Models;

namespace aspnetcoreapp.Data
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TodoItem>()
                .ToTable("TodoItems");
        }
    }
} 