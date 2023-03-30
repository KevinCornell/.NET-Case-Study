using Microsoft.EntityFrameworkCore;
using System.Transactions;

namespace Models;
public class FlashCardContext : DbContext
{
    public FlashCardContext(DbContextOptions<FlashCardContext> options) : base(options)
    { }

    public DbSet<FlashCard> FlashCards { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<FlashCard>(entity =>
        {
            entity.HasKey(x => x.id).HasName("PRIMARY");
            entity.ToTable("FlashCards", "dbo");
        });
    }
}
