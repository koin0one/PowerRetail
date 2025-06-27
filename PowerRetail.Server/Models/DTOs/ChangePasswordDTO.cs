namespace PowerRetail.Server.Models.DTOs
{
    public class ChangePasswordDTO
    {
        public required string UserName { get; set; }
        public required string OldPassword { get; set; }
        public required string NewPassword { get; set; }

    }
}
