using UserManager.Infrastructure.Entities;

namespace UserManager.Infrastructure.Interfaces;

public interface IUserRepository
{
    public User? GetUser(Guid id);
    public IEnumerable<User> GetUsers(int skip, int take);
    public User CreateUser(User user);
    public User UpdateUser(User user);
    public void DeleteUser(Guid id);
}
