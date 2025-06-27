using Microsoft.EntityFrameworkCore;
using PowerRetail.Server.Models;

namespace PowerRetail.Server.Data
{
    public class RetailContext : DbContext
    {
        public RetailContext(DbContextOptions<RetailContext> options) : base(options) {}

        public DbSet<User> Users { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails{ get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<DeliveryStaff> DeliveryStaffs{ get; set; }

    }
}
