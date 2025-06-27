using PowerRetail.Server.Interfaces;
using PowerRetail.Server.Models;
using PowerRetail.Server.Repositories;

namespace PowerRetail.Server.Services
{
    public class CustomerService
    {
        private readonly ICustomerRepository _customerRepository;

        public CustomerService(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }
    }
}
