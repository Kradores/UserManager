using Microsoft.EntityFrameworkCore;
using UserManager.Infrastructure;

namespace UserManager.API.Extensions;

internal static class DbExtentions
{
    public static IServiceCollection AddDbService(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<UserDbContext>(o => o.UseNpgsql(configuration["ConnectionStrings:UserManager"]));
        return services;
    }
}
