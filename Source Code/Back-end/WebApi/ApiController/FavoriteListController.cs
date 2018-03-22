using BusinessEntities;
using BusinessLayer.IServices;
using System;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebApi.ApiController
{

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/favorite-list")]
    public class FavoriteListController : System.Web.Http.ApiController
    {
        private readonly IFavoritesListService _favoritesListService;

        public FavoriteListController(IFavoritesListService favoritesListService)
        {
            _favoritesListService = favoritesListService;

        }
        
        // GET api/favoritelist/?userId=
        [HttpGet]
        [Route("{userId}")]
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
    }
}
