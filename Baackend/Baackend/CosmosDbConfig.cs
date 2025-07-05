namespace Baackend;

public class CosmosDbConfig
{
    public string ConnectionString { get; set; }
    public string? Database { get; set; }
    public string? Container { get; set; }
}