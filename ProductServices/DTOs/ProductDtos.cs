namespace ProductServices.Dtos;

public record ProductDto(
    int Id,
    string Name,
    string Description,
    decimal Price,
    int StockQty,
    string Category,
    string ImageUrl
);

public record CreateProductDto(
    string Name,
    string Description,
    decimal Price,
    int StockQty,
    string Category,
    string ImageUrl
);
