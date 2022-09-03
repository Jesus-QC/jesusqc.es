using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static System.Int32;

namespace Cdn.Controllers;

[Authorize]
[Route("api")]
public class UploadController : ControllerBase
{
    [DisableRequestSizeLimit, RequestFormLimits(MultipartBodyLengthLimit = MaxValue, ValueLengthLimit = MaxValue)]
    [HttpPost]
    [Route("upload/{**password}")]
    public IActionResult Get(IFormFile? file, string? path, [FromRoute] string password)
    {
        if (password != "yT4TwHnLK_ts6HGA5!NncxH9eN9CMG4q")
            return Unauthorized();

        if (file == null)
            return BadRequest("File null");

        var dir = path == null ? MainController.CdnDirectory : Path.Combine(MainController.CdnDirectory, path);
        if (!Directory.Exists(dir))
            Directory.CreateDirectory(dir);

        var fil = Path.Combine(dir, file.FileName);
        
        using var memoryStream = new MemoryStream();
        file.CopyTo(memoryStream);
        System.IO.File.WriteAllBytes(fil, memoryStream.ToArray());
        
        Console.ForegroundColor = ConsoleColor.DarkYellow;
        Console.WriteLine($"File {file.FileName} uploaded to {fil}.");
        return Ok($"https://cdn.jesusqc.es/f{(path is null ? "" : path.StartsWith("/") ? path : "/" + path)}/{file.FileName}");
    }
    
    [DisableRequestSizeLimit]
    [HttpPost]
    [Route("upload2/{**password}")]
    public IActionResult Upload(IFormFile? file, [FromRoute] string password, int size = 8)
    {
        if (password != "yT4TwHnLK_ts6HGA5!NncxH9eN9CMG4q")
            return Unauthorized();

        if (file == null)
            return BadRequest("File null");

        var dir = MainController.CdnDirectory;

        var name = GetUniqueKey(size);
        var ext = Path.GetExtension(file.FileName);
        var fil = Path.Combine(dir, name + ext);
        
        using var memoryStream = new MemoryStream();
        file.CopyTo(memoryStream);
        System.IO.File.WriteAllBytes(fil, memoryStream.ToArray());
        
        Console.ForegroundColor = ConsoleColor.DarkYellow;
        Console.WriteLine($"File {file.FileName} uploaded to {fil}.");
        return Ok($"https://cdn.jesusqc.es/f/{name + ext}");
    }
    
    internal static readonly char[] chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".ToCharArray(); 

    public static string GetUniqueKey(int size)
    {            
        byte[] data = new byte[4*size];
        using (var crypto = RandomNumberGenerator.Create())
        {
            crypto.GetBytes(data);
        }
        StringBuilder result = new StringBuilder(size);
        for (int i = 0; i < size; i++)
        {
            var rnd = BitConverter.ToUInt32(data, i * 4);
            var idx = rnd % chars.Length;

            result.Append(chars[idx]);
        }

        return result.ToString();
    }
}