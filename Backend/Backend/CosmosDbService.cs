using System.Text.Json;
using Backend.Models;
using Microsoft.Azure.Cosmos;

namespace Backend;

public class CosmosDbService
{
    private readonly CosmosClient _client;
    private readonly Container? _container;
    private readonly ILogger<CosmosDbService> _logger;

    public CosmosDbService(CosmosDbConfig config, ILogger<CosmosDbService> logger)
    {
        _logger = logger;

        if (string.IsNullOrWhiteSpace(config.ConnectionString))
            throw new ArgumentException("Cosmos DB connection string is missing");

        if (string.IsNullOrWhiteSpace(config.Database))
            throw new ArgumentException("Cosmos DB database name is missing");

        _client = new CosmosClient(config.ConnectionString);
    }

    public async Task<IEnumerable<Item>> GetAllAsync(string query = "SELECT * FROM c")
    {
        if (_container == null)
            throw new InvalidOperationException("Cosmos container not initialized");

        var results = new List<Item>();
        try
        {
            var iterator = _container.GetItemQueryIterator<Item>(new QueryDefinition(query));
            while (iterator.HasMoreResults)
            {
                var response = await iterator.ReadNextAsync();
                results.AddRange(response);
            }
        }
        catch (CosmosException ex)
        {
            _logger.LogError(ex, "Error querying Cosmos DB");
            throw;
        }

        return results;
    }

    public async Task AddItemAsync<Item>(Item item, string partitionKey)
    {
        if (_container == null)
            throw new InvalidOperationException("Cosmos container not initialized");

        try
        {
            await _container.CreateItemAsync(item, new PartitionKey(partitionKey));
        }
        catch (CosmosException ex)
        {
            _logger.LogError(ex, "Failed to add item to Cosmos DB");
            throw;
        }
    }

    public async Task<IEnumerable<Item>> GetMocked()
    {
        var mockFilePath = Path.Combine(AppContext.BaseDirectory, "data.json");

        if (!File.Exists(mockFilePath))
            throw new FileNotFoundException("Mock JSON file not found", mockFilePath);

        var json = await File.ReadAllTextAsync(mockFilePath);
        var items = JsonSerializer.Deserialize<IEnumerable<Item>>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        return items!;
    }
}
