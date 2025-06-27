using PowerRetail.Server.Models;

namespace PowerRetail.Server.Interfaces
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAllProductAsync();
        Task<Product> CreateProductAsync(Product product);
        Task<IEnumerable<Product>> CreateProductsAsync(IEnumerable<Product> products);
        Task<Product> DeleteProduct(Product product);
        Task<Product> UpdateProductAsync(Product product);
    }
}
