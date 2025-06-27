using System.ComponentModel.DataAnnotations;

namespace PowerRetail.Server.Models
{
    public class Product: Audit
    {
        [Key]
        public Guid SanPhamId { get; set; }
        public required string TenSanPham { get; set; }
        public required string LoaiSanPham { get; set; }
        public int SoLuong { get; set; }
        public required string GiaSanPham { get; set; }
        public required string MoTaSanPham { get; set; }
        public required string DanhMucSanPham { get; set; }

    }
}
