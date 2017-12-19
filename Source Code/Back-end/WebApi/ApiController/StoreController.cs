using BusinessLayer.IServices;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebApi.ApiController
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/store")]
    public class StoreController : System.Web.Http.ApiController
    {
        private readonly IStoreService _storeService;

        public StoreController(IStoreService storeService)
        {
            _storeService = storeService;
        }

        // GET api/store
        [HttpGet]
        [Route("")]
        public HttpResponseMessage Get()
        {
            try
            {
                var stores = _storeService.GetAllStore();
                if (stores != null)
                {
                    var storeEntities = stores.ToList();
                    if (storeEntities.Any())
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, storeEntities);
                    }
                }
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Got Exception");
            }

            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Stores not found");
        }

    }
}
