using Backend.Core.Modell.Request;
using FluentValidation;
using System;

namespace Backend.Validation
{
    public class PlayerRequestValidation : AbstractValidator<VersenyzoRequest>
    {
        public PlayerRequestValidation()
        {
            RuleFor(x => x.Nev).NotEmpty()
                                    .NotNull();

            RuleFor(x => x.Iranyzitoszam).NotEmpty()
                                      .NotNull();

            RuleFor(x => x.Telepules).NotEmpty()
                                .NotNull();

            RuleFor(x => x.Lakcim).NotEmpty()
                                       .NotNull();

            RuleFor(x => x.SzuletesiEv).NotEmpty()
                                  .NotNull()
                                  .GreaterThan(DateTime.Now);

            RuleFor(x => x.Kategoria).NotEmpty()
                                  .NotNull();
        }
    }
}
