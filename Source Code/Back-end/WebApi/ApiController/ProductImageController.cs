using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using BusinessEntities;
using BusinessLayer.Services;
using BusinessLayer.IServices;

namespace WebApi.ApiController
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProductImageController : System.Web.Http.ApiController
    {
        //private readonly IProductService _productServices;
        private readonly IProductImageService _productImageService;
    
        public ProductImageController(IProductImageService productImageService)
        {
            _productImageService = productImageService;

        }
        // GET api/productImage/?id=
        [HttpGet]
        public IHttpActionResult GetById(Guid id)
        {
            try
            {
                var productImage = _productImageService.GetProductImageById(id);
                if (productImage == null)
                {
                    return NotFound(); // Returns a NotFoundResult
                }
                return Ok(productImage);  // Returns an OkNegotiatedContentResult

            }
            catch (Exception e)
            {
                return NotFound();
            }

        }

        // GET api/productimage/?id=
        [HttpGet]
        public IHttpActionResult GetByProductId(Guid productId)
        {
            try
            {
                var productImages = _productImageService.GetAllProductImagesByProductId(productId);
                if (productImages == null)
                {
                    return NotFound(); // Returns a NotFoundResult
                }
                return Ok(productImages);  // Returns an OkNegotiatedContentResult

            }
            catch (Exception e)
            {
                return NotFound();
            }
            

        }
        //POST api/productimage
        [HttpPost]
        public IHttpActionResult Post([FromBody] ProductImageBusinessEntity productImageEntity)
        {
            try
            {
                return Ok(_productImageService.CreateProductImage(productImageEntity));

            }
            catch (Exception e)
            {
                return NotFound();
            }
           
        }

        // DELETE api/productimage/?id=
        [HttpDelete]
        public IHttpActionResult Delete(Guid id)
        {
            try
            {
                return Ok(_productImageService.DeleteProductImage(id));

            }
            catch (Exception e)
            {
                return NotFound();
            }
        
            
        }

    }
}
