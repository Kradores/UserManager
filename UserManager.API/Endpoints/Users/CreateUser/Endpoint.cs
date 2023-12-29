using Carter;
using UserManager.Infrastructure.Entities;
using UserManager.Infrastructure.Interfaces;

namespace UserManager.API.Endpoints.Users.CreateUser;

public class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/users", HandlePost);
    }

    private IResult HandlePost(Request request, IUserRepository userRepository)
    {
        var user = Map(request);

        userRepository.CreateUser(user);

        return Results.Ok(Map(user));
    }

    private static Response Map(User user)
    {
        return new Response()
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            Credit = user.Credit.Amount
        };
    }

    private static User Map(Request request)
    {
        return new User()
        {
            Name = request.Name,
            Email = request.Email,
            Credit = new Credit()
            {
                Amount = request.Credit
            }
        };
    }
}
