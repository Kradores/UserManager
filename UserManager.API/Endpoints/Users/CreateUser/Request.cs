namespace UserManager.API.Endpoints.Users.CreateUser;

public class Request
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public int Credit { get; set; } = 0;
}
