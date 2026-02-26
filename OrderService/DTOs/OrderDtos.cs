using System;

namespace OrderService.DTOs;

// What the react app sends the order service
public record CreateOrderRequest(int ProductId, int Quantity);

// What to send to the react app
public record OrderResponseDto(
    int Id,
    int ProductId,
    int Quantity,
    decimal TotalAmount,
    string Status,
    DateTime CreatedAt
);

// For ProductService communication
public record ProductResponseDto(int Id, string Name, decimal Price);
