using System.ComponentModel.DataAnnotations;

namespace PowerRetail.Server.Models
{
    public class DeliveryStaff
    {
        [Key]
        public Guid NhanVienGiaoHangId { get; set; }
        public required string HoTen { get; set; }
        public required string SoDienThoai { get; set; }
        public required string Email { get; set; }
        public int SoDonHangDaGiao { get; set; }
    }
}
