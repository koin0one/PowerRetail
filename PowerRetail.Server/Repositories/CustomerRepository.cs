using PowerRetail.Server.Data;
using PowerRetail.Server.Interfaces;
using PowerRetail.Server.Models;
using Microsoft.EntityFrameworkCore;


namespace PowerRetail.Server.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly RetailContext _context;
        public CustomerRepository(RetailContext context)
        {
            _context = context;
        }

        public async Task<Customer> AddCustomerAsync(Customer customer)
        {
            try
            {
                _context.Set<Customer>().Add(customer);
                await _context.SaveChangesAsync();
                return customer;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in AddCustomerAsync: {ex.Message}");
                throw;
            }
        }

        public async Task<bool> DeleteCustomerAsync(Guid customerId)
        {
            try
            {
                var customer = await _context.Set<Customer>().FindAsync(customerId);
                if (customer == null) return false;

                _context.Set<Customer>().Remove(customer);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in DeleteCustomerAsync: {ex.Message}");
                throw;
            }
        }

        public async Task<Customer> UpdateCustomerAsync(Customer updatedCustomer)
        {
            try
            {
                var customer = await _context.Set<Customer>().FindAsync(updatedCustomer.KhachHangId);
                if (customer == null) return null;

                customer.TenKhachHang = updatedCustomer.TenKhachHang;
                customer.SoDienThoai = updatedCustomer.SoDienThoai;
                customer.DiaChiNhanHang = updatedCustomer.DiaChiNhanHang;

                _context.Set<Customer>().Update(customer);
                await _context.SaveChangesAsync();
                return customer;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in UpdateCustomerAsync: {ex.Message}");
                throw;
            }
        }

        public async Task<List<Customer>> GetAllCustomersAsync()
        {
            try
            {
                return await _context.Set<Customer>().ToListAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetAllCustomersAsync: {ex.Message}");
                throw;
            }
        }

        public async Task<Customer> GetCustomerByIdAsync(Guid customerId)
        {
            try
            {
                return await _context.Set<Customer>().FindAsync(customerId);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetCustomerByIdAsync: {ex.Message}");
                throw;
            }
        }
    }
}
