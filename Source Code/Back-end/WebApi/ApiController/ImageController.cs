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
    public class ImageController : System.Web.Http.ApiController
    {
        private readonly IImageService _imageService;
        private readonly IUploadService _uploadService;

        public ImageController(IImageService imageService, IUploadService uploadService)
        {
            _imageService = imageService;
            _uploadService = uploadService;
        }

        // GET api/image
        [HttpGet]
        [Route("api/image/getAll")]
        public HttpResponseMessage Get()
        {
            try
            {
                var images = _imageService.GetAll();
                if (images != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, images);  // Returns an OkNegotiatedContentResult
                }
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Products not found");
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Unexception Error!");
            }
        }

        // GET api/image/{id}
        [HttpGet]
        [Route("api/image/{id?}")]
        public HttpResponseMessage Get(Guid id)
        {
            try
            {
                var image = _imageService.GetImage(id);
                if (image != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, image);
                }
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Image not found");
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Unexception Error!");

            }
        }

        // GET api/image/{storeId?}
        [HttpGet]
        [Route("api/image/store/{storeId?}")]
        public HttpResponseMessage GetImageByStoreId(Guid storeId)
        {
            try
            {
                var image = _imageService.GetImageByStoreId(storeId);
                if (image != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, image);
                }
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Image not found");
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Unexception Error!");

            }
        }

        // GET api/image/product
        [HttpGet]
        [Route("api/image/products")]
        public HttpResponseMessage GetAllProductImages()
        {
            try
            {
                var images = _imageService.GetAllProductImages().ToList();
                if (images.Any())
                {
                    return Request.CreateResponse(HttpStatusCode.OK, images);  // Returns an OkNegotiatedContentResult
                }
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Products not found");
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Unexception Error!");
            }
        }

        // GET api/image/stores
        [HttpGet]
        [Route("api/image/stores")]
        public HttpResponseMessage GetAllStoreImages()
        {
            try
            {
                var images = _imageService.GetAllStoreImages().ToList();
                if (images.Any())
                {
                    return Request.CreateResponse(HttpStatusCode.OK, images);  // Returns an OkNegotiatedContentResult
                }
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Stores not found");
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Unexception Error!");
            }
        }

        // DELETE api/image/
        [HttpDelete]
        [Route("api/image/{path?}")]
        public HttpResponseMessage Delete(string path)
        {
            try
            {
                return _uploadService.DeleteFile(path) ? Request.CreateResponse(HttpStatusCode.OK) : Request.CreateResponse(HttpStatusCode.NotImplemented, "Not Implemented!");
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Error!");
            }
        }
    }
}
