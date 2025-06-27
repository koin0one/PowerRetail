namespace PowerRetail.Server.Models.DTOs
{
    public class RegisterDTO
    {
        public required string UserName { get; set; }
        public required string Password { get; set; }
        public required string FullName { get; set; }
        public required string SecondPassword { get; set; }
    }
}
