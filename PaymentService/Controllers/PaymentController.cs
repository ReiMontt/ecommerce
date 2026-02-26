using Microsoft.AspNetCore.Mvc;
using PaymentService.Interfaces;
using Stripe;
using Stripe.Checkout;

namespace PaymentService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentController : ControllerBase
{
    private readonly IPaymentService _paymentService;
    private readonly IConfiguration _config;
    private readonly ILogger<PaymentController> _logger;

    public PaymentController(
        IPaymentService paymentService,
        IConfiguration config,
        ILogger<PaymentController> logger
    )
    {
        _paymentService = paymentService;
        _config = config;
        _logger = logger;
    }

    [HttpPost("create-session")]
    public async Task<IActionResult> CreateSession([FromBody] CreateSessionRequest request)
    {
        // Access the ID via request.OrderId
        var url = await _paymentService.CreateCheckoutSessionAsync(request.OrderId);
        return Ok(new { url });
    }

    [HttpPost("webhook")]
    public async Task<IActionResult> StripeWebhook()
    {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
        var signature = Request.Headers["Stripe-Signature"];
        var webhookSecret = _config["Stripe:WebhookSecret"];

        try
        {
            // Verify the signature
            var stripeEvent = EventUtility.ConstructEvent(json, signature, webhookSecret);

            if (stripeEvent.Type == "checkout.session.completed")
            {
                var session = stripeEvent.Data.Object as Session;
                await _paymentService.FulfillOrderAsync(session!.Id);
                _logger.LogInformation("✅ Payment Succeeded for Session {Id}", session.Id);
            }

            return Ok();
        }
        catch (StripeException e)
        {
            _logger.LogError("🛡️ Signature Verification Failed!");
            return BadRequest();
        }
    }
}

public record CreateSessionRequest(int OrderId);
