namespace UserManager.Infrastructure.Entities;

public class User
{
    public Guid Id { get; set; } = new Guid();
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public Credit Credit { get; set; } = null!;
}
