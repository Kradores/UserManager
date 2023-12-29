using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using UserManager.Infrastructure.Entities;

namespace UserManager.Infrastructure.EntityTypeConfigurations;

public class CreditEntityTypeConfiguration : IEntityTypeConfiguration<Credit>
{
    public void Configure(EntityTypeBuilder<Credit> builder)
    {
        builder.ToTable("credits");

        builder.HasKey(t => t.Id);
        builder.Property(t => t.Amount).HasDefaultValue(0);
    }
}
