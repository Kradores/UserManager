using Carter;
using UserManager.API.Extensions;

var builder = WebApplication.CreateSlimBuilder(args);

builder.Services
    .AddDbService(builder.Configuration)
    .AddRepositories()
    .AddCarter()
    .AddCors(options =>
    {
        options.AddDefaultPolicy(policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
    });

var app = builder.Build();

app.UseCors();
app.MapCarter();
app.ApplyMigrations();

app.Run();
