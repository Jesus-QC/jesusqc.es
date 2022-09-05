using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

namespace Cdn.Controllers;

[Controller]
[Route("account")]
public class AccountController : Controller
{
    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login(string password)
    {
        if (password != "Jquiroga132005!C")
        {
            Console.ForegroundColor = ConsoleColor.Magenta;
            Console.WriteLine($"{HttpContext.Request.Headers["CF-Connecting-IP"]} has failed the password. ({password})");
            return Unauthorized();
        }

        var claimsId = new ClaimsIdentity(new List<Claim>()
        {
            new (ClaimTypes.Name, "owner")
        } , CookieAuthenticationDefaults.AuthenticationScheme, "owner", "owner");
        var claimsPrincipal = new ClaimsPrincipal(claimsId);
        
        await HttpContext.SignInAsync(claimsPrincipal);
        
        return Redirect("/Files");
    }
}