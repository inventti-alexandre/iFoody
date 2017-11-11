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
    public class FavoriteListController : System.Web.Http.ApiController
    {
        //private readonly IProductService _productServices;
        private readonly IFavoritesListService _favoritesListService;

        public FavoriteListController(IFavoritesListService favoritesListService)
        {
            _favoritesListService = favoritesListService;

        }
        // GET api/favoritelist/?userId=
        [HttpGet]
        public IHttpActionResult GetByUserId(Guid userId)
        {
            try
            {
                var favoriteList = _favoritesListService.GetFavoriteByUserId(userId);
                if (favoriteList == null)
                {
                    return NotFound(); // Returns a NotFoundResult
                }
                return Ok(favoriteList);  // Returns an OkNegotiatedContentResult

            }
            catch (Exception e)
            {
                return NotFound();
            }

        }
        // GET api/favoritelist/?id=
        [HttpGet]
        public IHttpActionResult GetById(Guid id)
        {
            try
            {
                var favoriteItem = _favoritesListService.GetFavoriteById(id);
                if (favoriteItem == null)
                {
                    return NotFound(); // Returns a NotFoundResult
                }
                return Ok(favoriteItem);  // Returns an OkNegotiatedContentResult

            }
            catch (Exception e)
            {
                return NotFound();
            }

        }
        //POST api/favoritelist
        [HttpPost]
        public IHttpActionResult Post([FromBody] FavoriteListBusinessEntity favoriteListEntity)
        {
            try
            {
                return Ok(_favoritesListService.CreateFavoriteItem(favoriteListEntity));

            }
            catch (Exception e)
            {
                return NotFound();
            }

        }

        // DELETE api/favoritelist/?id=
        [HttpDelete]
        public IHttpActionResult Delete(Guid id)
        {
            try
            {
                return Ok(_favoritesListService.DeleteFavoriteItem(id));

            }
            catch (Exception e)
            {
                return NotFound();
            }


        }

    }
}
