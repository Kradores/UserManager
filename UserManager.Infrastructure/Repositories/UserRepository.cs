using Microsoft.EntityFrameworkCore;
using UserManager.Infrastructure.Entities;
using UserManager.Infrastructure.Interfaces;

namespace UserManager.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly UserDbContext Context;

    public UserRepository(UserDbContext context)
    {
        Context = context;
    }

    public User CreateUser(User user)
    {
        Context.Users.Add(user);
        Context.SaveChanges();
        return user;
    }

    public void DeleteUser(Guid id)
    {
        Context.Users.Where(x => x.Id == id).ExecuteDelete();
    }

    public User? GetUser(Guid id)
    {
        return Context.Users.Where(x => x.Id == id).FirstOrDefault();
    }

    public IEnumerable<User> GetUsers(int skip, int take)
    {
        return Context.Users.Skip(skip).Take(take).Include(user => user.Credit).ToList();
    }

    public User UpdateUser(User user)
    {
        Context.Users.Update(user);
        Context.SaveChanges();
        return user;
    }
}
