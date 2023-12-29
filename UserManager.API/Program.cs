using UserManager.API.Extensions;

var builder = WebApplication.CreateSlimBuilder(args);

builder.Services
    .AddDbService(builder.Configuration)
    .AddRepositories();

var app = builder.Build();

app.ApplyMigrations();
app.MapGet("/", () => "Welcome!");

app.Run();
