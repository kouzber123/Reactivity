using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
  //db context is abstraction of database
  public class DataContext : IdentityDbContext<AppUser>
  {
    public DataContext(DbContextOptions options) : base(options)
    {
    }
    //Activity > Activity.cs and Activities > collections
    //creating migration > table in the database
    //we get enitity from domain then we save it to activities
    public DbSet<Activity> Activities { get; set; }
    public DbSet<ActivityAttendee> ActivityAttendees { get; set; }

    public DbSet<Photo> Photos { get; set; }

    public DbSet<Comment> Comments { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {

      //many to many relationship
      base.OnModelCreating(builder);

      builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new { aa.AppUserId, aa.ActivityId }));

      builder.Entity<ActivityAttendee>()
      .HasOne(u => u.AppUser)
      .WithMany(a => a.Activities)
      .HasForeignKey(aa => aa.AppUserId);


      builder.Entity<ActivityAttendee>()
     .HasOne(u => u.Activity)
     .WithMany(a => a.Attendees)
     .HasForeignKey(aa => aa.ActivityId);


     builder.Entity<Comment>()
     .HasOne(a => a.Activity)
     .WithMany(c => c.Comments)
     .OnDelete(DeleteBehavior.Cascade);

    }
  }
}
