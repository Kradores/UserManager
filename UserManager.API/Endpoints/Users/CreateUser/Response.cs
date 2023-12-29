namespace UserManager.API.Endpoints.Users.CreateUser;

public class Response
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;

    public int Credit { get; set; }
}
