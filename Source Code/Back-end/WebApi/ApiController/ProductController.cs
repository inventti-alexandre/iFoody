using BusinessEntities;
using BusinessLayer.Services;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using BusinessLayer.IServices;
using WebApi.ActionFilters;

namespace WebApi.ApiController
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProductController : System.Web.Http.ApiController
    {
        //private readonly IProductService _productServices;
        private readonly IProductService _productService;


        public ProductController(IProductService productServices)
        {
            _productService = productServices;

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
