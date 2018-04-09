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
        private readonly IReviewService _reviewService;
        private readonly IImageService _imageService;
        private readonly IUploadService _uploadService;

        public StoreController(IStoreService storeService, ILocationService locationService, IReviewService reviewService, IImageService imageService, IUploadService uploadService)
        {
            _storeService = storeService;
            _locationService = locationService;
            _reviewService = reviewService;
            _imageService = imageService;
            _uploadService = uploadService;
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

        // GET Store Reviews By Store Id
        [HttpGet]
        [Route("review/{id?}")]
        public HttpResponseMessage GetStoreReviews(Guid id)
        {

            try
            {
                var reviews = _reviewService.GetStoreReviews(id).ToList();
                if (reviews.Count > 0)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, reviews);
                }
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Got Exception");
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No Review found for this Store");
        }

        // Delete Store
        [HttpDelete]
        [Route("{id?}")]
        public HttpResponseMessage DeleteStore(Guid id)
        {
            try
            {
                _storeService.DeleteStore(id);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "Exception Fail!");
            }
        }

        // DELETE api/stores/image/
        [HttpDelete]
        [Route("image/{id?}")]
        public HttpResponseMessage DeleteImage(Guid id)
        {
            try
            {
                if (_uploadService.DeleteFile(id))
                {
                    if (_imageService.DeleteProductImage(id))
                    {
                        {
                            return Request.CreateResponse(HttpStatusCode.OK);
                        }
                    }
                    return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Not Delete Image in table yet");
                }
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Not Implemented!");
            }
            catch
                (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Error!");
            }
        }
    }
}
