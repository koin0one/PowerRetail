using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PowerRetail.Server.Models;
using PowerRetail.Server.Services;

namespace PowerRetail.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;
        public ProductController(ProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProduct()
        {
            try
            {
                var productList = await _productService.GetAllProductAsync();

                return Ok(new { products = productList });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPost("create-product")]
        public async Task<IActionResult> CreateProduct(Product product)
        {
            try
            {
                var productList = await _productService.CreateProductAsync(product);

                return Ok(new { products = productList });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPost("create-products")]
        public async Task<IActionResult> CreateProducts([FromBody] IEnumerable<Product> products)
        {
            try
            {
                var productList = await _productService.CreateProductsAsync(products);

                return Ok(new { products = productList });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpDelete("delete-product")]
        public async Task<IActionResult> DeleteProduct(Product product)
        {
            try
            {
                var productDeleted = await _productService.DeleteProduct(product);
                return Ok(new { products = productDeleted });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPut("update-product")]
        public async Task<IActionResult> UpdateProduct(Product product)
        {
            try
            {
                var updated = await _productService.UpdateProductAsync(product);
                return Ok(new { product = updated });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
    }
}
