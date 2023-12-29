namespace UserManager.API.Endpoints.Users.GetUsers;

public class Response
{
    public List<User> Users { get; set; } = new();
    public int Rows { get; set; } = 0;

    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        public int Credit { get; set; }
    }
}
