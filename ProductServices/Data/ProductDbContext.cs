using Microsoft.EntityFrameworkCore;
using ProductServices.Models;

namespace ProductServices.Data;

public class ProductDbContext : DbContext
{
    public ProductDbContext(DbContextOptions<ProductDbContext> options)
        : base(options) { }

    public DbSet<Product> Products { get; set; }
}
