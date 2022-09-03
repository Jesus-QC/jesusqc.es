using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Cdn.Pages;

public class LoginModel : PageModel
{
    private readonly ILogger<LoginModel> _logger;

    public LoginModel(ILogger<LoginModel> logger)
    {
        _logger = logger;
    }

    public async Task<IActionResult> OnPost(string password)
    {
        if (password != "7v#8haAVq72t3Py7v#8haAVq72t3Py")
        {
            Console.ForegroundColor = ConsoleColor.Magenta;
            Console.WriteLine($"{Request.Headers["CF-Connecting-IP"]} has failed the password. ({password})");
            return Unauthorized();
        }

        var claimsId = new ClaimsIdentity(new List<Claim>()
        {
            new (ClaimTypes.Name, "owner")
        } , CookieAuthenticationDefaults.AuthenticationScheme, "owner", "owner");
        var claimsPrincipal = new ClaimsPrincipal(claimsId);

        await HttpContext.SignInAsync(claimsPrincipal);

        return LocalRedirect("/");
    }
}