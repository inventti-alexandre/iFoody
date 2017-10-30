using BusinessLayer.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApi.ApiController
{
    public class ProductController : System.Web.Http.ApiController
    {
        private readonly IProductService _productServices;

        public ProductController(IProductService productServices)
        {
            _productServices = productServices;

        }
        // GET api/ all products
        [Route("~/api/products")]
        public IHttpActionResult GetAllProducts()
        {
            var products = _productServices.GetAllProducts();
            if (products == null)
            {
                return NotFound(); // Returns a NotFoundResult
            }
            return Ok(products);  // Returns an OkNegotiatedContentResult

        }
    }
}
