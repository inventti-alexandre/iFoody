﻿using BusinessLayer.IServices;
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

        public ImageController(IImageService imageService)
        {
            _imageService = imageService;
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

        //// POST api/image
        //[HttpPost]
        //public HttpResponseMessage Post([FromBody] List<ImageBusinessEntity> images, Guid? userId)
        //{
        //    try
        //    {
        //        _imageService.UploadImage(images, userId);
        //        return Request.CreateResponse(HttpStatusCode.OK);
        //    }
        //    catch (CookieException e)
        //    {
        //        return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "Unexpection Error!");
        //    }
        //}

        //// Put api/put/5
        //[HttpPut]
        //public HttpResponseMessage Put([FromBody] ImageBusinessEntity image)
        //{
        //    try
        //    {
        //        if (!image.Equals(null))
        //        {
        //            _imageService.UpdateImage(image);
        //            return Request.CreateResponse(HttpStatusCode.OK);
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Exception Error");
        //    }
        //    return Request.CreateResponse(HttpStatusCode.NotFound, "User Not Found!");
        //}

        //// DELETE api/product/5
        //[HttpDelete]
        //public HttpResponseMessage Delete(Guid id)
        //{
        //    try
        //    {
        //        if (!id.Equals(null))
        //        {
        //            _imageService.DeleteImage(id);
        //            return Request.CreateResponse(HttpStatusCode.OK);
        //        }
        //        return Request.CreateResponse(HttpStatusCode.NotImplemented, "Not Implemented!");
        //    }
        //    catch (Exception e)
        //    {
        //        return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Error!");
        //    }
        //}
    }
}
