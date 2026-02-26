using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using ProductServices.Data;
using ProductServices.Dtos;
using ProductServices.Interfaces;
using ProductServices.Models;

namespace ProductServices.Services;

public class ProductService : IProductService
{
    private readonly ProductDbContext _db;
    private readonly IDistributedCache _cache;
    private readonly ILogger<ProductService> _logger;

    public ProductService(
        ProductDbContext db,
        IDistributedCache cache,
        ILogger<ProductService> logger
    )
    {
        _db = db;
        _cache = cache;
        _logger = logger;
    }

    public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
    {
        return await _db
            .Products.Select(p => new ProductDto(
                p.Id,
                p.Name,
                p.Description,
                p.Price,
                p.StockQty,
                p.Category,
                p.ImageUrl
            ))
            .ToListAsync();
    }

    public async Task<ProductDto?> GetProductByIdAsync(int id)
    {
        string cacheKey = $"product_{id}";
        var cached = await _cache.GetStringAsync(cacheKey);

        if (!string.IsNullOrEmpty(cached))
        {
            _logger.LogInformation("Cache Hit for Product {Id}", id);
            return JsonSerializer.Deserialize<ProductDto>(cached);
        }

        _logger.LogWarning("Cache Miss for Product {Id}", id);
        var p = await _db.Products.FindAsync(id);
        if (p == null)
            return null;

        var dto = new ProductDto(
            p.Id,
            p.Name,
            p.Description,
            p.Price,
            p.StockQty,
            p.Category,
            p.ImageUrl
        );

        await _cache.SetStringAsync(
            cacheKey,
            JsonSerializer.Serialize(dto),
            new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(15),
            }
        );

        return dto;
    }

    public async Task<ProductDto> CreateProductAsync(CreateProductDto dto)
    {
        var product = new Product
        {
            Name = dto.Name,
            Category = dto.Category,
            Description = dto.Description,
            Price = dto.Price,
            StockQty = dto.StockQty,
            ImageUrl = dto.ImageUrl,
        };

        _db.Products.Add(product);
        await _db.SaveChangesAsync();

        _logger.LogInformation("Created Product {Id} and clearing cache", product.Id);
        await _cache.RemoveAsync($"product_{product.Id}");

        return new ProductDto(
            product.Id,
            product.Name,
            product.Description,
            product.Price,
            product.StockQty,
            product.Category,
            product.ImageUrl
        );
    }
}
