using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderService.Data;
using OrderService.DTOs;
using OrderService.Models;

namespace OrderService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly OrderDbContext _db;

    public OrderController(IHttpClientFactory httpClientFactory, OrderDbContext db)
    {
        _httpClientFactory = httpClientFactory;
        _db = db;
    }

    // FIX: Added the return type and mapping logic
    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrderResponseDto>>> Get()
    {
        var orders = await _db
            .Orders.Select(order => new OrderResponseDto(
                order.Id,
                order.ProductId,
                order.Quantity,
                order.TotalAmount,
                order.Status,
                order.CreatedAt
            ))
            .ToListAsync();

        return Ok(orders);
    }

    [HttpPost]
    public async Task<IActionResult> PlaceOrder(CreateOrderRequest req)
    {
        var client = _httpClientFactory.CreateClient("ProductClient");

        // This now matches the [HttpGet("{id}")] we added above
        var res = await client.GetAsync($"api/product/{req.ProductId}");

        if (!res.IsSuccessStatusCode)
            return NotFound("Product is not found in ProductService");

        // Ensure ProductResponseDto matches the fields: Id, Name, Description, Price...
        var product = await res.Content.ReadFromJsonAsync<ProductResponseDto>();

        if (product == null)
            return BadRequest("Could not parse product details from ProductService");

        var order = new Order
        {
            ProductId = req.ProductId,
            Quantity = req.Quantity,
            TotalAmount = product.Price * req.Quantity, // Business Logic
            Status = "Pending",
        };

        _db.Orders.Add(order);
        await _db.SaveChangesAsync();

        var result = new OrderResponseDto(
            order.Id,
            order.ProductId,
            order.Quantity,
            order.TotalAmount,
            order.Status,
            order.CreatedAt
        );

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OrderResponseDto>> GetById(int id)
    {
        var order = await _db.Orders.FindAsync(id);
        if (order == null)
            return NotFound();

        return Ok(
            new OrderResponseDto(
                order.Id,
                order.ProductId,
                order.Quantity,
                order.TotalAmount,
                order.Status,
                order.CreatedAt
            )
        );
    }

    // This is the endpoint the PaymentService is screaming for!
    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromQuery] string newStatus)
    {
        var order = await _db.Orders.FindAsync(id);

        if (order == null)
        {
            return NotFound();
        }

        order.Status = newStatus;
        await _db.SaveChangesAsync();

        return NoContent(); // 204 Success
    }
}
