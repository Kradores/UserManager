using Carter;
using UserManager.Infrastructure.Entities;
using UserManager.Infrastructure.Interfaces;

namespace UserManager.API.Endpoints.Users.UpdateUser;

public class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("/users/{id:guid}", HandlePut);
    }

    private IResult HandlePut(Guid id, Request request, IUserRepository userRepository)
    {
        var user = userRepository.GetUser(id);

        if (user == null)
        {
            return Results.NotFound();
        }

        SetUserValues(request, user);

        userRepository.UpdateUser(user);

        return Results.Ok(Map(user));
    }

    private static Response Map(User user)
    {
        return new Response()
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
        };
    }

    private static User SetUserValues(Request request, User user)
    {
        if (request.Name is not null)
        {
            user.Name = request.Name;
        }

        if (request.Email is not null)
        {
            user.Email = request.Email;
        }

        return user;
    }
}
