using Microsoft.AspNetCore.Mvc;

namespace Baackend;

[ApiController]
[Route("api/[controller]")]
public class CosmosController : ControllerBase
{
    private readonly CosmosDbService _cosmos;

    public CosmosController(CosmosDbService cosmos)
    {
        _cosmos = cosmos;
    }

    [HttpGet("data")]
    public async Task<IActionResult> GetFromCosmos()
    {
        try
        {
            var items = await _cosmos.GetAllAsync();
            return Ok(items);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to fetch from Cosmos DB", details = ex.Message });
        }
    }

    [HttpGet("mock")]
    public async Task<IActionResult>  GetMock()
    {
        try
        {
            var items = await _cosmos.GetMocked();
            return Ok(items);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to fetch from Cosmos DB", details = ex.Message });
        }
    }
}