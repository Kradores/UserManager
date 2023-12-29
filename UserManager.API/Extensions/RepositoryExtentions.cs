using UserManager.Infrastructure.Interfaces;
using UserManager.Infrastructure.Repositories;

namespace UserManager.API.Extensions;

public static class RepositoryExtentions
{
    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ICreditRepository, CreditRepository>();

        return services;
    }
}
