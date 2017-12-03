﻿using BusinessEntities;
using BusinessLayer.IServices;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
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


        public ProductController(IProductService productServices, IReviewService reviewService)
        {
            _productService = productServices;
            _reviewService = reviewService;
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
        // GET api/product/?page=?&count={?}
        [HttpGet]
        public IHttpActionResult Get(int page, int ?count)
        {
            try
            {
                var products = _productService.GetProductsByPage(page,count);
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

        //POST api/product
        [HttpPost]
        public IHttpActionResult Post([FromBody] ProductBusinessEntity productEntity)
        {
            try
            {
                return Ok(_productService.CreateProduct(productEntity));
            }
            catch (Exception e)
            {
                return NotFound();
            }

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
