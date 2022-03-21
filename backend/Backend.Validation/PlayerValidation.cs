using Backend.Core.Modell.Entities;
using FluentValidation;
using System;

namespace Backend.Validation
{
    public class PlayerValidation : AbstractValidator<Versenyzo>
    {
        public PlayerValidation()
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
