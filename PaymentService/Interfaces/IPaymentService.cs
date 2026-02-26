using PaymentService.Dtos;

namespace PaymentService.Interfaces;

public interface IPaymentService
{
    // Generates the Stripe URL for the user to visit
    Task<string> CreateCheckoutSessionAsync(int orderId);

    // Processes the secure data sent from Stripe's server
    Task<bool> FulfillOrderAsync(string sessionId);
}
