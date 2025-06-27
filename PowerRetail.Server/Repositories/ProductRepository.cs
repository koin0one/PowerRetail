using Microsoft.EntityFrameworkCore;
using PowerRetail.Server.Data;
using PowerRetail.Server.Interfaces;
using PowerRetail.Server.Models;

namespace PowerRetail.Server.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly RetailContext _context;
        public ProductRepository(RetailContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetAllProductAsync()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product> CreateProductAsync(Product product)
        {
            try
            {
                product.SanPhamId = Guid.NewGuid();
                await _context.Set<Product>().AddAsync(product);
                await _context.SaveChangesAsync();

                return product;
            } catch (Exception e)
            {
                throw new Exception("Error when add new product: ", e);
            }
            
        }

        public async Task<IEnumerable<Product>> CreateProductsAsync(IEnumerable<Product> products)
        {
            try
            {
                foreach (var product in products)
                {
                    product.SanPhamId = Guid.NewGuid();
                }

                await _context.Set<Product>().AddRangeAsync(products);

                await _context.SaveChangesAsync();

                return products;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in AddMultipleProductsAsync: {ex.Message}");
                throw;
            }
        }

        public async Task<Product> DeleteProduct(Product product)
        {
            try
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
                return product;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in AddMultipleProductsAsync: {ex.Message}");
                throw;
            }
        }
        public async Task<Product> UpdateProductAsync(Product product)
        {
            try
            {
                var existingProduct = await _context.Products.FindAsync(product.SanPhamId);
                if (existingProduct == null)
                {
                    throw new Exception($"Product with ID {product.SanPhamId} does not exist.");
                }

                existingProduct.TenSanPham = product.TenSanPham;
                existingProduct.MoTaSanPham = product.MoTaSanPham;
                existingProduct.LoaiSanPham = product.LoaiSanPham;
                existingProduct.DanhMucSanPham = product.DanhMucSanPham;
                existingProduct.GiaSanPham = product.GiaSanPham;
                existingProduct.SoLuong = product.SoLuong;

                _context.Products.Update(existingProduct);
                await _context.SaveChangesAsync();

                return existingProduct;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in UpdateProductAsync: {ex.Message}");
                throw;
            }
        }

    }
}
