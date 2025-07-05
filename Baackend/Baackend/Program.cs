using Baackend;
using Microsoft.Azure.Cosmos;

var builder = WebApplication.CreateBuilder(args);

// Read Cosmos config
var cosmosConfig = builder.Configuration
    .GetSection("CosmosDb")
    .Get<CosmosDbConfig>();

builder.Services.AddSingleton(cosmosConfig);
builder.Services.AddSingleton<CosmosClient>(sp =>
    new CosmosClient(cosmosConfig.ConnectionString));
builder.Services.AddSingleton<CosmosDbService>();

// Read Frontend URL from settings
var frontendUrl = builder.Configuration["Frontend:Url"];

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins(frontendUrl ?? throw new InvalidOperationException("Frontend URL not configured"))
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();