using Carter;
using UserManager.API.Extensions;

var builder = WebApplication.CreateSlimBuilder(args);

builder.Services
    .AddDbService(builder.Configuration)
    .AddRepositories()
    .AddCarter();

var app = builder.Build();

app.MapCarter();
app.ApplyMigrations();

app.Run();
