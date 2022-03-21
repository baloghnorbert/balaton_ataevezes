using Backend.Core.Constans;
using Backend.Core.Enums;
using Backend.Services.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.Threading.Tasks;

namespace Backend.API.Controllers
{
    [ApiController]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ImageUploadController : ControllerBase
    {
        public ImageUploadController()
        {
        }

        [ApiExplorerSettings(GroupName = ApplicationSettingsConstans.PublicAPI)]
        [SwaggerOperation(OperationId = "image")]
        [Route("api/v{version:apiVersion}/upload/image")]
        [ApiVersion(ApplicationSettingsConstans.ActiveVersion)]
        [HttpPost]
        [ProducesResponseType((int)HttpResponseType.OK, Type = typeof(string))]
        [ProducesResponseType((int)HttpResponseType.BadRequest)]
        public async Task<string> UploadImageAsync([FromForm] IFormFile file)
        {
            string result = await ImageUploadHandler.SaveFile(file);

            return result;
        }
    }
}
