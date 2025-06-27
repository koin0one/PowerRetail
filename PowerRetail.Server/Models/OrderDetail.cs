using System.ComponentModel.DataAnnotations;

namespace PowerRetail.Server.Models
{
    public class OrderDetail
    {
        [Key]
        public Guid ChiTietDonHangId { get; set; }
        public Guid DonHangId { get; set; }
        public Guid SanPhamId { get; set; }
        public int SoLuong { get; set; }
        public decimal DonGia { get; set; }
        public decimal TongTien => SoLuong * DonGia;
    }

}
