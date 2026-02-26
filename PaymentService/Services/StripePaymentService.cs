using System.Net.Http.Json;
using PaymentService.Dtos;
using PaymentService.Interfaces;
using Stripe;
using Stripe.Checkout;

namespace PaymentService.Services;

public class StripePaymentService : IPaymentService
{
    private readonly IStripeClient _stripeClient;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<StripePaymentService> _logger;

    public StripePaymentService(
        IStripeClient stripeClient,
        IHttpClientFactory httpClientFactory,
        ILogger<StripePaymentService> logger
    )
    {
        _stripeClient = stripeClient;
        _httpClientFactory = httpClientFactory;
        _logger = logger;
    }

    public async Task<string> CreateCheckoutSessionAsync(int orderId)
    {
        // 1. Get Order details from OrderService
        var orderClient = _httpClientFactory.CreateClient("OrderClient");
        var order = await orderClient.GetFromJsonAsync<OrderSummaryDto>($"api/order/{orderId}");

        if (order == null)
            throw new Exception("Order not found");

        // 2. Setup Stripe Session Options
        var options = new SessionCreateOptions
        {
            SuccessUrl = "http://localhost:5173/success", // React success page
            CancelUrl = "http://localhost:5173/cancel",
            PaymentMethodTypes = new List<string> { "card" },
            Mode = "payment",
            // This links Stripe's transaction back to our internal Order ID
            ClientReferenceId = order.Id.ToString(),
            LineItems = new List<SessionLineItemOptions>
            {
                new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        UnitAmount = (long)(order.TotalAmount * 100), // Stripe uses cents
                        Currency = "php",
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = $"Order #{order.Id}",
                        },
                    },
                    Quantity = 1,
                },
            },
        };

        // 3. Create the session using the injected client
        var service = new SessionService(_stripeClient);
        var session = await service.CreateAsync(options);

        return session.Url;
    }

    public async Task<bool> FulfillOrderAsync(string sessionId)
    {
        var service = new SessionService(_stripeClient);
        var session = await service.GetAsync(sessionId);

        // 1. Check if the ID exists before parsing
        if (string.IsNullOrEmpty(session.ClientReferenceId))
        {
            _logger.LogWarning(
                "⚠️ Received Stripe webhook for session {SessionId} but ClientReferenceId (OrderId) is missing.",
                sessionId
            );
            return false;
        }

        if (!int.TryParse(session.ClientReferenceId, out int orderId))
        {
            _logger.LogError(
                "❌ Could not parse ClientReferenceId '{RefId}' as an integer.",
                session.ClientReferenceId
            );
            return false;
        }

        _logger.LogInformation("💰 Fulfilling Order {OrderId}...", orderId);

        // 2. Call OrderService
        var orderClient = _httpClientFactory.CreateClient("OrderClient");

        // Ensure this route matches your OrderController exactly (singular/plural)
        var response = await orderClient.PatchAsync(
            $"api/order/{orderId}/status?newStatus=Paid",
            null
        );

        return response.IsSuccessStatusCode;
    }
}
