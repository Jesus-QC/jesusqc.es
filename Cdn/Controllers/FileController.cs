using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace Cdn.Controllers;

[Controller]
public class FileController : Controller
{
    [Route("/f/{*path}")]
    public ActionResult Index(string path)
    {
        var file = new FileInfo(Path.Combine(Environment.CurrentDirectory, "Content", "Public", path));

        Console.ForegroundColor = file.Exists ? ConsoleColor.DarkCyan : ConsoleColor.Red;
        Console.WriteLine(path + $" was requested by {Request.Headers["CF-Connecting-IP"]}.");
        
        if (!file.Exists)
            return NotFound();
            
        var fs = new FileStream(file.FullName, FileMode.Open, FileAccess.Read);
        new FileExtensionContentTypeProvider().TryGetContentType(file.Name, out var contentType);
        return new FileStreamResult(fs, contentType ?? "octocat/stream");
    }
    
    [Route("/p/{*path}")]
    [Authorize]
    public ActionResult Private(string path)
    {
        var file = new FileInfo(Path.Combine(Environment.CurrentDirectory, "Content", "Private", path));

        Console.ForegroundColor = file.Exists ? ConsoleColor.DarkCyan : ConsoleColor.Red;
        Console.WriteLine(path + $" was requested by {Request.Headers["CF-Connecting-IP"]}.");
        
        if (!file.Exists)
            return NotFound();
            
        var fs = new FileStream(file.FullName, FileMode.Open, FileAccess.Read);
        new FileExtensionContentTypeProvider().TryGetContentType(file.Name, out var contentType);
        return new FileStreamResult(fs, contentType ?? "octocat/stream");
    }
}