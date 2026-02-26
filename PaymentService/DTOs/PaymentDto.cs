namespace PaymentService.Dtos;

// What the frontend sends to start a payment
public record CreateCheckoutRequest(int OrderId);

// What we get back from OrderService when we "check" the order details
public record OrderSummaryDto(int Id, decimal TotalAmount, string Status);
