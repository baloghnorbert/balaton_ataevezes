using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System;
using Backend.Core.Constans;
using Backend.Core.Enums;
using Backend.Core.Modell.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Backend.Core.Modell.Request;
using System.Linq;
using Backend.Services.Common;
using System.Threading.Tasks;

namespace Backend.API.Controllers
{
    [ApiController]
    public partial class VersenyzoController : ControllerBase
    {
        public VersenyzoController()
        {
        }

        [ApiExplorerSettings(GroupName = ApplicationSettingsConstans.PublicAPI)]
        [SwaggerOperation(OperationId = "mind")]
        [Route("api/v{version:apiVersion}/versenyzok/ossz-nevezett")]
        [ApiVersion(ApplicationSettingsConstans.ActiveVersion)]
        [HttpGet]
        [ProducesResponseType((int)HttpResponseType.OK, Type = typeof(List<Versenyzo>))]
        [ProducesResponseType((int)HttpResponseType.BadRequest)]
        [Produces("application/json")]
        public List<Versenyzo> GetAll()
        {
            try
            {
                return FakeDataStorage.Data;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        [ApiExplorerSettings(GroupName = ApplicationSettingsConstans.PublicAPI)]
        [SwaggerOperation(OperationId = "oldal")]
        [Route("api/v{version:apiVersion}/versenyzok/oldal/{page}")]
        [ApiVersion(ApplicationSettingsConstans.ActiveVersion)]
        [HttpGet]
        [ProducesResponseType((int)HttpResponseType.OK, Type = typeof(List<Versenyzo>))]
        [ProducesResponseType((int)HttpResponseType.BadRequest)]
        [Produces("application/json")]
        public List<Versenyzo> Page([FromRoute][Required] int page = 0)
        {
            try
            {
                return FakeDataStorage.Data.Skip(page * 10)
                                           .Take(10)
                                           .ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [ApiExplorerSettings(GroupName = ApplicationSettingsConstans.PublicAPI)]
        [SwaggerOperation(OperationId = "rajtszamSzerint")]
        [Route("api/v{version:apiVersion}/versenyzok/rajtszam/{rajtszam}")]
        [ApiVersion(ApplicationSettingsConstans.ActiveVersion)]
        [HttpGet]
        [ProducesResponseType((int)HttpResponseType.OK, Type = typeof(Versenyzo))]
        [ProducesResponseType((int)HttpResponseType.BadRequest)]
        [Produces("application/json")]
        public Versenyzo GetById([FromRoute][Required] int rajtszam)
        {
            try
            {
                return FakeDataStorage.Data.Find(x => x.Rajtszam == rajtszam);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [ApiExplorerSettings(GroupName = ApplicationSettingsConstans.PublicAPI)]
        [SwaggerOperation(OperationId = "torles")]
        [Route("api/v{version:apiVersion}/versenyzok/torles/{rajtszam}")]
        [ApiVersion(ApplicationSettingsConstans.ActiveVersion)]
        [HttpDelete]
        [ProducesResponseType((int)HttpResponseType.OK, Type = typeof(bool))]
        [ProducesResponseType((int)HttpResponseType.BadRequest)]
        [Produces("application/json")]
        public async Task<bool> Delete([FromRoute][Required] int rajtszam)
        {
            try
            {
                await FakeDataStorage.DeletePalyer(rajtszam);
                FakeDataStorage.SaveData();

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        [ApiExplorerSettings(GroupName = ApplicationSettingsConstans.PublicAPI)]
        [SwaggerOperation(OperationId = "nevezes")]
        [Route("api/v{version:apiVersion}/versenyzok/nevezes")]
        [ApiVersion(ApplicationSettingsConstans.ActiveVersion)]
        [HttpPost]
        [ProducesResponseType((int)HttpResponseType.OK, Type = typeof(Versenyzo))]
        [ProducesResponseType((int)HttpResponseType.BadRequest)]
        [Produces("application/json")]
        public Versenyzo CreateAsync([FromBody] [Required] VersenyzoRequest requestParam)
        {
            try
            {
                Versenyzo lastInCategory = FakeDataStorage.Data.Last(x => x.Kategoria == requestParam.Kategoria);
                
                int id = FakeDataStorage.Data.Last().Id + 1;
                int startingNumber =   lastInCategory == null ?
                                                        FakeDataStorage.AlapRajtszam(requestParam.Kategoria) :
                                                        lastInCategory.Rajtszam + 1;

                Versenyzo newData = new Versenyzo(requestParam, id, startingNumber);
                FakeDataStorage.AddNewPalyer(newData);
                FakeDataStorage.SaveData();

                return newData;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        [ApiExplorerSettings(GroupName = ApplicationSettingsConstans.PublicAPI)]
        [SwaggerOperation(OperationId = "modositas")]
        [Route("api/v{version:apiVersion}/versenyzok/modositas")]
        [ApiVersion(ApplicationSettingsConstans.ActiveVersion)]
        [HttpPut]
        [ProducesResponseType((int)HttpResponseType.OK, Type = typeof(Versenyzo))]
        [ProducesResponseType((int)HttpResponseType.BadRequest)]
        [Produces("application/json")]
        public async Task<Versenyzo> UpdateAsync([FromBody][Required] Versenyzo requestParam)
        {
            try
            {
                await FakeDataStorage.UpdatePalyer(requestParam);

                FakeDataStorage.SaveData();

                return requestParam;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
    }
}
