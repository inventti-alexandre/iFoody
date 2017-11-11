using AttributeRouting.Web.Http;
using BusinessEntities;
using BusinessLayer.IServices;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApi.ActionFilters;

namespace WebApi.ApiController
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserController : System.Web.Http.ApiController
    {
        private readonly IUserService _userService;


        //public UserController(IUserService userService)
        //{
        //    _userService = userService;
        //}
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // Get api/user
        [HttpGet]
        [AuthorizationRequired]
        //[ApiAuthenticationFilter]
        public HttpResponseMessage Get()
        {
            try
            {
                var users = _userService.GetAllUsers();
                if (users != null)
                {
                    var usersEntities = users.ToList();
                    if (usersEntities.Any())
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, usersEntities);
                    }
                }
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Got Exception");
            }

            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Users not found");
        }

        // GET api/user/5
        [HttpGet]
        public HttpResponseMessage Get(Guid id)
        {
            try
            {
                var user = _userService.GetUserById(id);
                if (user != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, user);
                }
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Got Exception");
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No User found for this id");

        }

        // POST api/user
        [HttpPost]
        [POST("signup")]
        public HttpResponseMessage Post([FromBody] UserBusinessEntity user)
        {
            try
            {
                //var userJson = JsonConvert.DeserializeObject<UserBusinessEntity>(user);
                var signUpUserId = _userService.SignUp(user);
                return Request.CreateResponse(HttpStatusCode.OK, signUpUserId);
            }
            catch (CookieException e)
            {
                return Request.CreateResponse(HttpStatusCode.NotImplemented);
            }
        }

        // Put api/put/5
        [HttpPut]
        public HttpResponseMessage Put(Guid id, [FromBody] UserBusinessEntity user)
        {
            try
            {
                if (!id.Equals(null))
                {
                    _userService.UpdateUser(id, user);
                    return Request.CreateResponse(HttpStatusCode.OK);
                }
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Got Exception");
            }
            return Request.CreateResponse(HttpStatusCode.NotFound, "User Not Found!");
        }

        // DELETE api/product/5
        [HttpDelete]
        public HttpResponseMessage Delete(Guid id)
        {
            if (!id.Equals(null))
            {
                _userService.DeleteUser(id);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            return Request.CreateResponse(HttpStatusCode.NotImplemented, "Not Implemented!");
        }

    }
}
