using Application.Activities;
var builder = WebApplication.CreateBuilder(args);

//add services to container


builder.Services.AddControllers(opt =>
{
  var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
  opt.Filters.Add(new AuthorizeFilter(policy));
})
.AddFluentValidation(config =>
{
  config.RegisterValidatorsFromAssemblyContaining<Create>();
});

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);


//configure the http pipeline

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{

  app.UseSwagger();
  app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
}

// app.UseHttpsRedirection();


app.UseCors("CorsPolicy");

//order matters first authentication then authorization
app.UseAuthentication();
app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();


app.MapControllers();
app.MapHub<ChatHub>("/chat");
app.MapFallbackToController("Index", "Fallback");

using var scope = app.Services.CreateScope();

var services = scope.ServiceProvider;
try
{
  //get data from the datacontext create database if not exisitng then seed the seeddata of the datacontext
  var context = services.GetRequiredService<DataContext>();
  var userManager = services.GetRequiredService<UserManager<AppUser>>();
  await context.Database.MigrateAsync();
  await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{
  var logger = services.GetRequiredService<ILogger<Program>>();
  logger.LogError(ex, "An error occured during migration");
}
await app.RunAsync();



