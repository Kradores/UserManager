using Carter;
using UserManager.Infrastructure.Entities;
using UserManager.Infrastructure.Interfaces;

namespace UserManager.API.Endpoints.Users.GetUsers;

public class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/users", HandleGet);
    }

    private IResult HandleGet(int skip, int take, IUserRepository userRepository)
    {
        var users = userRepository.GetUsers(skip, take);
        var count = userRepository.CountUsers();

        var response = Map(users, count);

        return Results.Ok(response);
    }

    private static Response Map(IEnumerable<User> users, int rows)
    {
        var response = new Response
        {
            Users = users.Select(x => new Response.User()
            {
                Id = x.Id,
                Name = x.Name,
                Email = x.Email,
                Credit = x.Credit.Amount
            }).ToList(),
            Rows = rows
        };

        return response;
    }
}
