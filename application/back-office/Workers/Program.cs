using PlatformPlatform.BackOffice.Core;
using PlatformPlatform.BackOffice.Core.Database;
using PlatformPlatform.SharedKernel.ApiCore;
using PlatformPlatform.SharedKernel.InfrastructureCore;

// Worker service is using WebApplication.CreateBuilder instead of Host.CreateDefaultBuilder to allow scaling to zero
var builder = WebApplication.CreateBuilder(args);

// Configure services for the Application, Infrastructure layers like Entity Framework, Repositories, MediatR,
// FluentValidation validators, Pipelines.
builder.Services
    .AddServices()
    .AddStorage(builder)
    .ConfigureDevelopmentPort(builder, 9299);

var host = builder.Build();

// Apply migrations to the database (should be moved to GitHub Actions or similar in production)
host.Services.ApplyMigrations<BackOfficeDbContext>();

host.Run();
