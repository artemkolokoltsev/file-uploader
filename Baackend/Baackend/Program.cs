using Baackend;

var builder = WebApplication.CreateBuilder(args);

// Access configuration (appsettings.* are loaded automatically)
var configuration = builder.Configuration;

// Register services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Bind config and register Cosmos services
builder.Services.Configure<CosmosDbConfig>(configuration.GetSection("CosmosDb"));

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();