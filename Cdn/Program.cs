using Cdn.Controllers;
using Microsoft.AspNetCore.Authentication.Cookies;

MainController.CdnDirectory = Path.Combine(Environment.CurrentDirectory, "CdnContent");
Directory.CreateDirectory(MainController.CdnDirectory);

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddRazorPages();

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(x =>
{
    x.Events = new CookieAuthenticationEvents()
    {
        OnRedirectToLogin = context =>
        {
            context.Response.Redirect("/login");
            return Task.CompletedTask;
        },
    };
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();
app.MapControllers();

app.Run();