using Carter;
using UserManager.Infrastructure.Interfaces;

namespace UserManager.API.Endpoints.Users.DeleteUser;

public class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapDelete("/users/{id:guid}", HandleDelete);
    }

    private IResult HandleDelete(Guid id, IUserRepository userRepository)
    {
        userRepository.DeleteUser(id);

        return Results.Ok();
    }
}
