using Microsoft.AspNetCore.Mvc;
using PowerRetail.Server.Models;
using Microsoft.EntityFrameworkCore;
using PowerRetail.Server.Data;

namespace PowerRetail.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DeliveryStaffController : ControllerBase
    {
        private readonly RetailContext _context;

        public DeliveryStaffController(RetailContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DeliveryStaff>>> GetAllDeliveryStaff()
        {
            return await _context.DeliveryStaffs.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DeliveryStaff>> GetDeliveryStaff(Guid id)
        {
            var staff = await _context.DeliveryStaffs.FindAsync(id);
            if (staff == null)
            {
                return NotFound(new { Message = "Delivery staff not found" });
            }
            return staff;
        }

        [HttpPost]
        public async Task<ActionResult<DeliveryStaff>> AddDeliveryStaff(DeliveryStaff deliveryStaff)
        {
            try {
                deliveryStaff.NhanVienGiaoHangId = Guid.NewGuid();
                if (deliveryStaff.SoDienThoai.Length != 10)
                {
                    throw new Exception("So dien thoai phai la 10 chu so");
                }

                if (deliveryStaff.SoDonHangDaGiao < 0)
                {
                    throw new Exception("So don da giao khong duoc phep nho hon 0");
                }
                _context.DeliveryStaffs.Add(deliveryStaff);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetDeliveryStaff), new { id = deliveryStaff.NhanVienGiaoHangId }, deliveryStaff);
            } catch (Exception e)
            {
                throw new Exception("Error when add new staff: ", e);
            }
            
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDeliveryStaff(Guid id, DeliveryStaff deliveryStaff)
        {
            if (id != deliveryStaff.NhanVienGiaoHangId)
            {
                return BadRequest(new { Message = "ID mismatch" });
            }

            var existingStaff = await _context.DeliveryStaffs.FindAsync(id);
            if (existingStaff == null)
            {
                return NotFound(new { Message = "Delivery staff not found" });
            }

            if (deliveryStaff.SoDienThoai.Length != 10)
            {
                throw new Exception("So dien thoai phai la 10 chu so");
            }

            if (deliveryStaff.SoDonHangDaGiao < 0)
            {
                throw new Exception("So don da giao khong duoc phep nho hon 0");
            }

            existingStaff.HoTen = deliveryStaff.HoTen;
            existingStaff.SoDienThoai = deliveryStaff.SoDienThoai;
            existingStaff.Email = deliveryStaff.Email;
            existingStaff.SoDonHangDaGiao = deliveryStaff.SoDonHangDaGiao;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDeliveryStaff(Guid id)
        {
            var staff = await _context.DeliveryStaffs.FindAsync(id);
            if (staff == null)
            {
                return NotFound(new { Message = "Delivery staff not found" });
            }

            _context.DeliveryStaffs.Remove(staff);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
