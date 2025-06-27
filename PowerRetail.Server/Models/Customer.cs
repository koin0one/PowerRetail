using System.ComponentModel.DataAnnotations;

namespace PowerRetail.Server.Models
{
    public class Customer: Audit
    {
        [Key]
        public Guid KhachHangId { get; set; }
        public required string TenKhachHang { get; set; }
        public required string SoDienThoai { get; set; }
        public required string DiaChiNhanHang { get; set; }
    }
}
