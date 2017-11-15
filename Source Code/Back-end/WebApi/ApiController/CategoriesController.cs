using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using BusinessEntities;
using BusinessLayer.IServices;

namespace WebApi.ApiController
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CategoriesController : System.Web.Http.ApiController
    {
        //private readonly IProductService _productServices;
        private readonly ICategoriesService _categoriesService;


        public CategoriesController(ICategoriesService categoriesService)
        {
            _categoriesService = categoriesService;

        }
        // GET api/categories
        [HttpGet]
        public IHttpActionResult Get()
        {
            try
            {
                var categories = _categoriesService.GetAllCategories();
                if (categories == null)
                {
                    return NotFound(); // Returns a NotFoundResult
                }
                return Ok(categories);  // Returns an OkNegotiatedContentResult
            }
            catch (Exception e)
            {
                return NotFound();
            }



        }
        // GET api/categories/?id=
        [HttpGet]
        public IHttpActionResult Get(Guid id)
        {
            try
            {
                var category = _categoriesService.GetCategoryById(id);
                if (category == null)
                {
                    return NotFound(); // Returns a NotFoundResult
                }
                return Ok(category);  // Returns an OkNegotiatedContentResult
            }
            catch (Exception e)
            {
                return NotFound();
            }


        }
        //POST api/categories
        [HttpPost]
        public IHttpActionResult Post([FromBody] CategoryBusinessEntity categoryEntity)
        {
            try
            {
                return Ok(_categoriesService.CreateCategory(categoryEntity));
            }
            catch (Exception e)
            {
                return NotFound();
            }

        }

        // DELETE api/categories/?id=
        [HttpDelete]
        public IHttpActionResult Delete(Guid id)
        {
            try
            {
                return Ok(_categoriesService.DeleteCategory(id));
            }
            catch (Exception e)
            {
                return NotFound();
            }


        }
        // PUT api/categories/?id=
        [HttpPut]
        public IHttpActionResult Put([FromBody]CategoryBusinessEntity categoryEntity)
        {
            try
            {
                return Ok(_categoriesService.UpdateCategory(categoryEntity));
            }
            catch (Exception e)
            {
                return NotFound();
            }

        }
    }
}
