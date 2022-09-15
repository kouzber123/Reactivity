using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
  //db context is abstraction of database
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions options) : base(options)
    {
    }
    //Activity > Activity.cs and Activities > collections 
    //creating migration > table in the database 
    //we get enitity from domain then we save it to activities
    public DbSet <Activity> Activities { get; set; }
  }
}