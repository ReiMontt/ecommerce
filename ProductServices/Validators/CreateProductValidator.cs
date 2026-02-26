using FluentValidation;
using ProductServices.Dtos;

namespace ProductServices.Validators;

public class CreateProductValidator : AbstractValidator<CreateProductDto>
{
    public CreateProductValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MinimumLength(3).WithMessage("Name is required");
        RuleFor(x => x.Price).NotEmpty().WithMessage("Price is required");
        RuleFor(x => x.Price).GreaterThan(0).WithMessage("Price must be greater than 0");

        RuleFor(x => x)
            .Custom(
                (dto, context) =>
                {
                    if (dto.Name.Contains("Free") && dto.Price > 0)
                    {
                        context.AddFailure("Price", "Price must be greater than 0");
                    }
                }
            );
    }
}
