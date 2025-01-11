using Microsoft.EntityFrameworkCore;
using BookMark.Models;

namespace BookMark.Data;

public class MyDbContext : DbContext
{
  public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
  { }
  public DbSet<Book> Books { get; set; }
}