using BusinessLayer.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace WebApi.ApiController
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/Stores")]
    public class StoreController : System.Web.Http.ApiController
    {
        private readonly IStoreService _storeService;
        private readonly ILocationService _locationService;

        public StoreController(IStoreService storeService, ILocationService locationService)
        {
            _storeService = storeService;
            _locationService = locationService;
        }

        // GET All api/store
        [HttpGet]
        [Route("getAll")]
        public HttpResponseMessage Get()
        {
            try
            {
                var store = _storeService.GetAllStore();
                if (store == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Not Found Store");
                }
                return Request.CreateResponse(HttpStatusCode.OK, store);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Expectation Failed");
            }
        }

        // GET api/store/{userId}
        [HttpGet]
        [Route("{userId?}")]
        public IHttpActionResult GetStoreByUserId(Guid userId)
        {
            try
            {
                var store = _storeService.GetStoreByUserId(userId);
                if (store == null)
                {
                    return NotFound(); // Returns a NotFoundResult
                }
                return Ok(store);  // Returns an OkNegotiatedContentResult
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        // GET api/store/addresses
        [HttpGet]
        [Route("addresses")]
        public HttpResponseMessage GetStoreAddresses([FromUri]string storeIds)
        {
            try
            {
                var deserializeStoreIds = new JavaScriptSerializer().Deserialize<List<string>>(storeIds);
                var ids = new List<Guid>();

                foreach (var storeId in deserializeStoreIds)
                {
                    ids.Add(new Guid(storeId));
                }

                var result = _locationService.GetLocationFromStoreIds(ids);
                if (result != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, result.ToList());

                }
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No result found");
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Got Exception");
            }
        }

        // GET All api/store
        [HttpGet]
        [Route("getAllLocations")]
        public HttpResponseMessage GetAllLocations()
        {
            try
            {
                var locations = _locationService.GetAllLocations().ToList();
                if (!locations.Any())
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Not Found Locations");
                }
                return Request.CreateResponse(HttpStatusCode.OK, locations);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Expectation Failed");
            }
        }
    }
}
