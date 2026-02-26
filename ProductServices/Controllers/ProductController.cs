using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using ProductServices.Data;
using ProductServices.Dtos;
using ProductServices.Interfaces;
using ProductServices.Models;

namespace ProductServices.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductService _service;
    private readonly IValidator<CreateProductDto> _validator;

    public ProductController(IProductService service, IValidator<CreateProductDto> validator)
    {
        _service = service;
        _validator = validator;
    }

    [HttpGet]
    public async Task<IActionResult> GetProducts() => Ok(await _service.GetAllProductsAsync());

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateProduct(CreateProductDto dto)
    {
        var validationResult = await _validator.ValidateAsync(dto);
        if (!validationResult.IsValid)
            return BadRequest(validationResult.ToDictionary());

        var result = await _service.CreateProductAsync(dto);
        return CreatedAtAction(nameof(GetProduct), new { id = result.Id }, result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProduct(int id)
    {
        var product = await _service.GetProductByIdAsync(id);
        return product == null ? NotFound() : Ok(product);
    }
}
