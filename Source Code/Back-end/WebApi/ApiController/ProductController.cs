using BusinessLayer.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BusinessEntities;
using BusinessLayer.Services;

namespace WebApi.ApiController
{
    public class ProductController : System.Web.Http.ApiController
    {
        //private readonly IProductService _productServices;
        private readonly ProductService _productService;


        public ProductController(ProductService productServices)
        {
            _productService = productServices;

        }

        // GET api/product
        [HttpGet]
        public IHttpActionResult Get()
        {

            var products = _productService.GetAllProducts();
            if (products == null)
            {
                return NotFound(); // Returns a NotFoundResult
            }
            return Ok(products);  // Returns an OkNegotiatedContentResult

        }
        // GET api/product/?id=
        [HttpGet]
        public IHttpActionResult Get( Guid id)
        {

            var product = _productService.GetProductById(id);
            if (product == null)
            {
                return NotFound(); // Returns a NotFoundResult
            }
            return Ok(product);  // Returns an OkNegotiatedContentResult

        }
        //POST api/product
        [HttpPost]
        public Guid Post([FromBody] ProductBusinessEntity productEntity)
        {
            return _productService.CreateProduct(productEntity);
        }

        // DELETE api/product/?id=
        [HttpDelete]
        public bool Delete(Guid id)
        {
            if (id!=null)
                return _productService.DeleteProduct(id);
            return false;
        }
        // PUT api/product/?id=
        [HttpPut]
        public bool Put([FromBody]ProductBusinessEntity productEntity)
        {
            if (productEntity.Id !=null)
            {
                return _productService.UpdateProduct(productEntity);
            }
            return false;
        }
    }
}
