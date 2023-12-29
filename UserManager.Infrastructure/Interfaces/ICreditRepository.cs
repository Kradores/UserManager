using UserManager.Infrastructure.Entities;

namespace UserManager.Infrastructure.Interfaces;

public interface ICreditRepository
{
    public Credit? GetCredit(Guid userId);
    public Credit UpdateCredit(Credit credit);
}
