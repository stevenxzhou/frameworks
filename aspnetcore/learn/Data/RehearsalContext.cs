using Microsoft.EntityFrameworkCore;
using aspnetcoreapp.Models;

namespace aspnetcoreapp.Data
{
    public class RehearsalContext : DbContext
    {
        public RehearsalContext(DbContextOptions<RehearsalContext> options)
            : base(options)
        {
        }

        public DbSet<Rehearsal> Rehearsals { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Rehearsal>()
                .ToTable("Rehearsals");
        }
    }
} 