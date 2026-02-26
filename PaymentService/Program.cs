using PaymentService.Interfaces;
using PaymentService.Services;
using Serilog;
using Stripe;

var builder = WebApplication.CreateBuilder(args);

// 1. Stripe Client Injection
builder.Services.AddSingleton<IStripeClient>(
    new StripeClient(builder.Configuration["Stripe:SecretKey"])
);

// 2. Our Service Injection
builder.Services.AddScoped<IPaymentService, StripePaymentService>();

// 3. HttpClient to talk to OrderService
builder.Services.AddHttpClient(
    "OrderClient",
    client =>
    {
        client.BaseAddress = new Uri("http://orderservice:8080/");
    }
);

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Stripe
builder.Services.AddSingleton<IStripeClient>(s => new StripeClient(
    builder.Configuration["Stripe:SecretKey"]
));

// Add your internal service
builder.Services.AddScoped<IPaymentService, StripePaymentService>();

// Serilog
// 1. Configure Serilog
Log.Logger = new LoggerConfiguration()
    .Enrich.WithProperty("Application", "PaymentService") // Identify this service
    .WriteTo.Console()
    .WriteTo.Seq("http://seq:80")
    .CreateLogger();

builder.Host.UseSerilog(); // Tell .NET to use Serilog instead of the default logger

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
