using System.ComponentModel.DataAnnotations;

namespace PowerRetail.Server.Models
{
    public class Order
    {
        [Key]
        public Guid DonHangId { get; set; }
        public Guid KhachHangId { get; set; }
        public Guid NhanVienGiaoHangId { get; set; }
        public DateTime NgayDatHang { get; set; }
        public required string TrangThaiDonHang { get; set; }
    }
}
