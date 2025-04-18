using Microsoft.EntityFrameworkCore;
using aspnetcoreapp.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddControllers();

// Read CORS configuration from appsettings.json
var corsOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins(corsOrigins)
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

// Add database contexts
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), 
    new MySqlServerVersion(new Version(8, 0, 21))));

builder.Services.AddDbContext<RehearsalContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), 
    new MySqlServerVersion(new Version(8, 0, 21))));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseCors(); // Enable CORS

app.UseAuthorization();

app.MapRazorPages();
app.MapControllers(); // Add this line to map controller routes

app.Run();