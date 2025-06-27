using PowerRetail.Server.Interfaces;
using PowerRetail.Server.Models;

namespace PowerRetail.Server.Services
{
    public class ProductService
    {
        private readonly IProductRepository _productRepository;
        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }
        public async Task<List<Product>> GetAllProductAsync()
        {
            return await _productRepository.GetAllProductAsync();
        }
        public async Task<Product> CreateProductAsync(Product product)
        {
            if (product.SoLuong < 0)
            {
                throw new Exception("Product count must equal or more than 0");
            }
            return await _productRepository.CreateProductAsync(product);
        }
        public async Task<IEnumerable<Product>> CreateProductsAsync(IEnumerable<Product> product)
        {
            return await _productRepository.CreateProductsAsync(product);
        }
        public async Task<Product> DeleteProduct(Product product)
        {
            return await _productRepository.DeleteProduct(product);
        }

        public async Task<Product> UpdateProductAsync(Product product)
        {
            if (product.SoLuong < 0)
            {
                throw new Exception("Product count must equal or more than 0");
            }
            return await _productRepository.UpdateProductAsync(product);
        }
    }
}
