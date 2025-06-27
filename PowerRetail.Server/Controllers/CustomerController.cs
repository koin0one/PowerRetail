using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PowerRetail.Server.Interfaces;
using PowerRetail.Server.Models;
using PowerRetail.Server.Repositories;

namespace PowerRetail.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerRepository _repository;

        public CustomerController(ICustomerRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public async Task<IActionResult> AddCustomer(Customer customer)
        {
            var result = await _repository.AddCustomerAsync(customer);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(Guid id)
        {
            var success = await _repository.DeleteCustomerAsync(id);
            return success ? Ok() : NotFound();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCustomer(Customer customer)
        {
            var result = await _repository.UpdateCustomerAsync(customer);
            return result != null ? Ok(result) : NotFound();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCustomers()
        {
            var customers = await _repository.GetAllCustomersAsync();
            return Ok(customers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomerById(Guid id)
        {
            var customer = await _repository.GetCustomerByIdAsync(id);
            return customer != null ? Ok(customer) : NotFound();
        }
    }
}
