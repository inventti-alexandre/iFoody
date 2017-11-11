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
        private readonly IProductImagesService _productImageService;
    
        public ProductImageController(IProductImagesService productImageService)
        {
            _productImageService = productImageService;

        }

        // GET api/productimage/?productid=
        [HttpGet]
        public IHttpActionResult Get(Guid Id)
        {
            try
            {
                var productImages = _productImageService.GetAllProductImagesByProductId(Id);
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
