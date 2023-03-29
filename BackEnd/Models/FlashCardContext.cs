using Microsoft.EntityFrameworkCore;
using System.Transactions;

namespace Models;
public class FlashCardContext : DbContext
{
    public FlashCardContext(DbContextOptions<FlashCardContext> options) : base(options)
    { }

    public DbSet<FlashCard> FlashCards { get; set; } = null!;
}
