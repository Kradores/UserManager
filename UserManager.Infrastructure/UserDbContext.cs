using Microsoft.EntityFrameworkCore;
using UserManager.Infrastructure.Entities;
using UserManager.Infrastructure.EntityTypeConfigurations;

namespace UserManager.Infrastructure
{
    public class UserDbContext : DbContext
    {
        public DbSet<User> Users {  get; set; }
        public DbSet<Credit> Credits { get; set; }

        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("users");
            modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new CreditEntityTypeConfiguration());
        }
    }
}
