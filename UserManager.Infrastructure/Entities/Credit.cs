namespace UserManager.Infrastructure.Entities;

public class Credit
{
    public int Id { get; set; }
    public int Amount { get; set; } = 0;
    public Guid UserId { get; set; }
}
