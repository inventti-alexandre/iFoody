using BusinessLayer.IServices;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebApi.ApiController
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/Store")]
    public class StoreController : System.Web.Http.ApiController
    {
        private readonly IStoreService _storeService;
        public StoreController(IStoreService storeService)
        {
            _storeService = storeService;
        }

        // GET All api/store
        [HttpGet]
        [Route("")]
        public IHttpActionResult Get()
        {
            try
            {
                var store = _storeService.GetAllStore();
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

        // GET api/store/{id}
        [HttpGet]
        [Route("{id}")]
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
        public IHttpActionResult GetStoreAddresses(List<Guid> ids)
        {
            try
            {
                // var storeAddresses = _storeService.GetStoreAddress(ids);
                //return Ok(storeAddresses);
                return NotFound();
            }
            catch (Exception e)
            {
                return NotFound();
                throw;
            }
        }
    }
}
