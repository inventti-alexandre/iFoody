﻿using AutoMapper;
using BusinessEntities;
using BusinessLayer.DTOs;
using BusinessLayer.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebApi.ApiController
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProductController : System.Web.Http.ApiController
    {
        //private readonly IProductService _productServices;
        private readonly IProductService _productService;
        private readonly IReviewService _reviewService;
        private readonly IUploadService _uploadService;


        public ProductController(IProductService productServices, IReviewService reviewService, IUploadService uploadService)
        {
            _productService = productServices;
            _reviewService = reviewService;
            _uploadService = uploadService;
        }

        // GET api/product
        [HttpGet]
        public IHttpActionResult Get()
        {
            try
            {
                var products = _productService.GetAllProducts();
                if (products == null)
                {
                    return NotFound(); // Returns a NotFoundResult
                }
                return Ok(products);  // Returns an OkNegotiatedContentResult
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        // Tuan made
        // GET api/getAllProductsWithoutDto
        [HttpGet]
        [Route("api/getAllProductsWithoutDto")]
        public IHttpActionResult GetAllProductsWithoutDto()
        {
            try
            {
                var products = _productService.GetAllProductsWithoutDto();
                if (products == null)
                {
                    return NotFound(); // Returns a NotFoundResult
                }
                return Ok(products);  // Returns an OkNegotiatedContentResult
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        // GET api/product/?page=?&count={?}
        [HttpGet]
        public IHttpActionResult Get(int page, int? count)
        {
            try
            {
                var products = _productService.PagingAllProducts(page, count);
                if (products == null)
                {
                    return NotFound(); // Returns a NotFoundResult
                }
                return Ok(products);  // Returns an OkNegotiatedContentResult
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
        // GET api/product/?categoryId=?&page=?&count={?}
        [HttpGet]
        [Route("api/product/{categoryId?}/{page?}/{count?}")]
        public IHttpActionResult GetProductByCategoryPaging(Guid categoryId, int page, int? count)
        {
            try
            {
                var products = _productService.PagingAllProductsByCategory(categoryId, page, count);
                if (products == null)
                {
                    return NotFound(); // Returns a NotFoundResult
                }
                return Ok(products);  // Returns an OkNegotiatedContentResult
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
        // GET api/product/?categoryId=
        [HttpGet]
        public IHttpActionResult GetProductByCategory(Guid categoryId)
        {
            try
            {
                var products = _productService.GetProductsByCategory(categoryId);
                if (products == null)
                {
                    return NotFound(); // Returns a NotFoundResult
                }
                return Ok(products);  // Returns an OkNegotiatedContentResult
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        // GET api/product/?id=
        [HttpGet]
        [Route("api/product/{id?}")]
        public IHttpActionResult Get(Guid id)
        {
            try
            {
                var product = _productService.GetProductById(id);
                if (product == null)
                {
                    return NotFound(); // Returns a NotFoundResult
                }
                return Ok(product);  // Returns an OkNegotiatedContentResult
            }
            catch (Exception e)
            {
                return NotFound();
            }


        }

        // Get api/product/?categoryId=
        [HttpGet]
        [Route("api/product/category/{categoryId}")]
        public HttpResponseMessage GetProductByCategoryId(Guid categoryId)
        {
            try
            {
                var products = _productService.GetProductByCategoryId(categoryId).ToList();
                if (products.Count > 0)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, products);
                }
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No Product found for this Catogory");

            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Got Exception");
            }


        }

        // GET api/product/review/{id}
        [HttpGet]
        [Route("api/product/review/{id}")]
        public HttpResponseMessage GetReview(Guid id)
        {
            try
            {
                var reviews = _reviewService.GetReviews(id).ToList();
                if (reviews.Count > 0)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, reviews);
                }
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Got Exception");
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No Review found for this Product");
        }

        // Tuan made
        // GET api/user/review
        [HttpGet]
        [Route("api/product/review")]
        public HttpResponseMessage GetReviews()
        {
            try
            {
                var reviews = _reviewService.GetAllReviews();
                if (reviews != null)
                {
                    var reviewsEntities = reviews.ToList();
                    if (reviewsEntities.Any())
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, reviewsEntities);
                    }
                }
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Got Exception");
            }

            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Reviews not found");
        }

        //POST api/product
        [HttpPost]
        [Route("api/product")]
        public HttpResponseMessage Post([FromBody] UploadProductDto uploadProductDto)
        {
            try
            {
                if (uploadProductDto == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Cannot Open Store");
                }

                var authToken = Request.Headers.GetValues("Token").FirstOrDefault();
                // var userToken = _tokenService.GetUserId(authToken);

                Mapper.CreateMap<UploadProductDto, ProductBusinessEntity>();
                var productEntity = Mapper.Map<UploadProductDto, ProductBusinessEntity>(uploadProductDto);

                // Save Store
                // storeDto.RegistrationDate = DateTime.Today;
                var productId = _productService.CreateProduct(productEntity);
                /////////////////////////////
                // Save Store Image
                var imageUploadList = new List<FileUploadResult>();
                foreach (var image in uploadProductDto.Images)
                {
                    //var imageString = _uploadService.Base64Decode(image.);
                    //byte[] bytes = Encoding.ASCII.GetBytes(imageString);
                    imageUploadList.Add(image);
                }

                if (imageUploadList.Any())
                {
                    _uploadService.UploadFile(imageUploadList);
                }

                //_userService.UpdateHasStoreProperty(storeDto.UserId.GetValueOrDefault());
                ///////////////////////
                // Insert Location to DB
                //var location = _locationService.GetLocationFromAddress(storeDto.Address);

                //var locationBusinessEntity = new LocationBusinessEntity()
                //{
                //    Latitude = System.Convert.ToDecimal(location.GetType().GetProperty("Latitude").GetValue(location, null)),
                //    Longitude = System.Convert.ToDecimal(location.GetType().GetProperty("Longitude").GetValue(location, null)),
                //    StoreId = storeId
                //};
                //if (!_locationService.InsertLocation(locationBusinessEntity))
                //{
                //    return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed,
                //        "Cannot Insert Location to Table");
                //};
                /////////////////////////////////
                return Request.CreateResponse(HttpStatusCode.OK, productId);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Error unexpected");
            }
            //try
            //{
            //    return Ok(_productService.CreateProduct(productEntity));
            //}
            //catch (Exception e)
            //{
            //    return NotFound();
            //}

        }

        // DELETE api/product/?id=
        [HttpDelete]
        public IHttpActionResult Delete(Guid id)
        {
            try
            {
                return Ok(_productService.DeleteProduct(id));
            }
            catch (Exception e)
            {
                return NotFound();
            }


        }

        // PUT api/product/?id=
        [HttpPut]
        public IHttpActionResult Put([FromBody]ProductBusinessEntity productEntity)
        {
            try
            {
                return Ok(_productService.UpdateProduct(productEntity));
            }
            catch (Exception e)
            {
                return NotFound();
            }

        }
    }
}
