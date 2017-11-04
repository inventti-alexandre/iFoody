using BusinessLayer.IServices;
using System.Net;
using System.Net.Http;

namespace WebApi.ApiController
{
    public class UserApiController : System.Web.Http.ApiController
    {
        private readonly IUserService _userService;


        //public UserApiController(IUserService userService)
        //{
        //    _userService = userService;
        //}
        public UserApiController(IUserService userService)
        {
            _userService = userService;
        }

        public HttpResponseMessage Get()
        {
            var users = _userService.Authenticate("123", "123");
            var x = _userService.GetAllUsers();
            if (users != null)
            {
                //var usersEntities = users as List<User> ?? products.ToList();
                //if (productEntities.Any())
                //return Request.CreateResponse(HttpStatusCode.OK, productEntities);
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Products not found");
        }
    }
}
