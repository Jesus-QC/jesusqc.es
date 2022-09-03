using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace Cdn.Controllers;

[Route("f")]
public class MainController : ControllerBase
{
    [Route("{*path}")]
    [Route("{path?}")]
    public IActionResult Get([FromRoute] string? path)
    {
        if (path == null)
            return NotFound();

        var file = new FileInfo(Path.Combine(CdnDirectory, path));

        Console.ForegroundColor = file.Exists ? ConsoleColor.DarkCyan : ConsoleColor.Red;
        Console.WriteLine(path + $" was requested by {Request.Headers["CF-Connecting-IP"]}.");
        
        if (!file.Exists)
            return NotFound();
            
        var fs = new FileStream(file.FullName, FileMode.Open, FileAccess.Read);
        new FileExtensionContentTypeProvider().TryGetContentType(file.Name, out var contentType);
        return new FileStreamResult(fs, contentType ?? "application/json");
    }

    public static string CdnDirectory = "";
}