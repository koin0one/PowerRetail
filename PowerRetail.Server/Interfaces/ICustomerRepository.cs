using PowerRetail.Server.Models;

namespace PowerRetail.Server.Interfaces
{
    public interface ICustomerRepository
    {
        Task<List<Customer>> GetAllCustomersAsync();
        Task<Customer> AddCustomerAsync(Customer customer);
        Task<bool> DeleteCustomerAsync(Guid customerId);
        Task<Customer> UpdateCustomerAsync(Customer updatedCustomer);
        Task<Customer> GetCustomerByIdAsync(Guid customerId);
    }
}
