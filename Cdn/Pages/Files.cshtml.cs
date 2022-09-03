using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Cdn.Pages;

public class FilesModel : PageModel
{
    private readonly ILogger<FilesModel> _logger;

    public FilesModel(ILogger<FilesModel> logger)
    {
        _logger = logger;
    }

    public void OnGet()
    {
    }
}