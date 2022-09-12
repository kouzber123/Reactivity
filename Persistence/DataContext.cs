using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    //db context is abstraaction of database
  public class DataContext : DbContext
  {
    public DataContext(DbContextOptions options) : base(options)
    {
    }
    //Activity > Activity.cs and Activities > collections 
    //creating migration > table in the database 
    public DbSet <Activity> Activities { get; set; }
  }
}