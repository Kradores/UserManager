using Carter;
using UserManager.Infrastructure.Entities;
using UserManager.Infrastructure.Interfaces;

namespace UserManager.API.Endpoints.Credits;

public class Endpoint : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPut("/users/{userId:guid}/credits", HandlePut);
    }

    private IResult HandlePut(Guid userId, Request request, ICreditRepository creditRepository)
    {
        var credit = creditRepository.GetCredit(userId);

        if (credit == null)
        {
            return Results.NotFound();
        }

        CalculateCredit(request, credit);

        creditRepository.UpdateCredit(credit);

        return Results.Ok(Map(credit));
    }

    private static Response Map(Credit credit)
    {
        return new Response()
        {
            UserId = credit.UserId,
            Credit = credit.Amount,
        };
    }

    private static void CalculateCredit(Request request, Credit credit)
    {
        credit.Amount += request.ChangeAmountBy;
    }
}
