using UserManager.Infrastructure.Entities;
using UserManager.Infrastructure.Interfaces;

namespace UserManager.Infrastructure.Repositories;

public class CreditRepository : ICreditRepository
{
    private readonly UserDbContext Context;

    public CreditRepository(UserDbContext context)
    {
        Context = context;
    }

    public Credit? GetCredit(Guid userId)
    {
        return Context.Credits.Where(x => x.UserId == userId).FirstOrDefault();
    }

    public Credit UpdateCredit(Credit credit)
    {
        Context.Credits.Update(credit);
        Context.SaveChanges();
        return credit;
    }
}
