namespace PowerRetail.Server.Models
{
    public class User : Audit
    {
        public Guid UserId { get; set; } = Guid.NewGuid();
        public required string UserName { get; set; }
        public required string Password { get; set; }
        public required string FullName { get; set; }
        public required string SecondPassword { get; set; }
    }
}
