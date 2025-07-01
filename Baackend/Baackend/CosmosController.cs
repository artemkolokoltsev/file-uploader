namespace Baackend;

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CosmosController : ControllerBase
{
    [HttpGet("data")]
    public async Task<IActionResult> Explore()
    {
        var data = new[]
        {
            new
            {
                id = "abc123",
                ner = new { parentId = "" },
                cla = new { fileClassification = "valid" },
                status = new[] { "GREEN", "YELLOW" }
            },
            new
            {
                id = "def456",
                ner = new { parentId = "abc123" },
                cla = new { fileClassification = "invalid" },
                status = new[] { "RED" }
            }
        };

        return Ok(data);
    }
}