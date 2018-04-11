using BusinessLayer.DTOs;
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
    public class ProductController : System.Web.Http.ApiController
    {
        //private readonly IProductService _productServices;
        private readonly IProductService _productService;
        private readonly IReviewService _reviewService;
        private readonly IUploadService _uploadService;
        private readonly IImageService _imageService;


        public ProductController(IProductService productServices, IReviewService reviewService, IUploadService uploadService, IImageService imageService)
        {
            _productService = productServices;
            _reviewService = reviewService;
            _uploadService = uploadService;
            _imageService = imageService;
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
                var reviews = _reviewService.GetProductReviews(id).ToList();
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
                    return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Cannot Upload Product");
                }

                var authToken = Request.Headers.GetValues("Token").FirstOrDefault();
                // var userToken = _tokenService.GetUserId(authToken);

                // Mapper.CreateMap<UploadProductDto, ProductBusinessEntity>();
                // var productEntity = Mapper.Map<UploadProductDto, ProductBusinessEntity>(uploadProductDto);

                var productId = _productService.CreateProduct(uploadProductDto);

                /////////////////////////////////
                return Request.CreateResponse(HttpStatusCode.OK, productId);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Error unexpected");
            }
        }

        // PUT api/product/?id=
        [HttpPut]
        [Route("api/product/{id?}")]
        public IHttpActionResult Put(Guid id, [FromBody]UploadProductDto uploadProductDto)
        {
            try
            {
                return Ok(_productService.UpdateProduct(uploadProductDto));
            }
            catch (Exception e)
            {
                return NotFound();
            }

        }

        // DELETE api/product/?id=
        [HttpDelete]
        [Route("api/product/{id?}")]
        public IHttpActionResult Delete(Guid id)
        {
            try
            {
                var imageIds = _imageService.GetImageIdsByProductId(id).ToList();
                foreach (var imageId in imageIds)
                {
                    _imageService.DeleteProductImage(imageId);
                }
                _productService.DeleteProduct(id);

                return Ok();
            }
            catch (Exception e)
            {
                return NotFound();
            }


        }
    }
}
