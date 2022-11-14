using Persistence;
using Microsoft.EntityFrameworkCore;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace API
{
  public class Program
    {
        public static async Task Main(string[] args)
        {
          var host = CreateHostBuilder(args).Build();
        
          using var scope = host.Services.CreateScope();

          var services = scope.ServiceProvider;

          try
          {
            //get data from the datacontext create database if not exisitng then seed the seeddata of the datacontext
            var context = services.GetRequiredService<DataContext>();
            var userManager = services.GetRequiredService<UserManager<AppUser>>();
            await context.Database.MigrateAsync();
            await Seed.SeedData(context, userManager);
          } 
          catch (Exception ex) {
             var logger = services.GetRequiredService<ILogger<Program>>();
             logger.LogError(ex, "An error occured during migration");
          }
          await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
