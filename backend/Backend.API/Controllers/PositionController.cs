using Backend.Core.Constans;
using Backend.Core.Enums;
using Backend.Core.Modell.Entities;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;

namespace Backend.API.Controllers
{
    [ApiController]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class KategoriaController : ControllerBase
    {

        public KategoriaController()
        {
        }

        [ApiExplorerSettings(GroupName = ApplicationSettingsConstans.PublicAPI)]
        [SwaggerOperation(OperationId = "all")]
        [Route("api/v{version:apiVersion}/kategoriak/mind")]
        [ApiVersion(ApplicationSettingsConstans.ActiveVersion)]
        [HttpGet]
        [ProducesResponseType((int)HttpResponseType.OK, Type = typeof(List<Kategoria>))]
        [ProducesResponseType((int)HttpResponseType.BadRequest)]
        public List<Kategoria> AllAsync()
        {
            return new List<Kategoria>()
            {
                new Kategoria("SUP", "SUP"),
                new Kategoria("Kenu", "Kenu"),
                new Kategoria("Kajak", "Kajak"),
                new Kategoria("Sarkanyhajo_10", "Sarkanyhajo (10 személyes)"),
                new Kategoria("Sarkanyhajo_20", "Sarkanyhajo (20 személyes)"),
                new Kategoria("Vizibicikli_2", "Vizibicikli (2 személyes)")
            };
        }
    }
}
