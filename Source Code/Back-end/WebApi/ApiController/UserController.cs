using BusinessEntities;
using BusinessLayer.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApi.ActionFilters;

namespace WebApi.ApiController
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/User")]
    public class UserController : System.Web.Http.ApiController
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;
        private readonly IImageService _imageService;
        private readonly IProductService _productService;
        //public UserController(IUserService userService)
        //{
        //    _userService = userService;
        //}
        public UserController(IUserService userService, ITokenService tokenService, IImageService imageService, IProductService productService)
        {
            _userService = userService;
            _tokenService = tokenService;
            _imageService = imageService;
            _productService = productService;
        }

        // Get api/user
        [HttpGet]
        [Route("")]
        // [AuthorizationRequired]
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
        [Route("id")]
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
        [Route("signup")]
        //[Route("api/user/signup")]
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

        // POST api/user/upload
        [HttpPost]
        [Route("upload")]
        public HttpResponseMessage Post([FromBody] List<ImageBusinessEntity> images)
        {
            try
            {
                if (images != null)
                {
                    var authToken = Request.Headers.GetValues("Token").FirstOrDefault();
                    var userToken = _tokenService.GetUserId(authToken);
                    _imageService.UploadImage(images, userToken.GetValueOrDefault());

                    return Request.CreateResponse(HttpStatusCode.OK);
                }
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Cannot upload Images");
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Error unexpected");
            }
        }

        // Sign In
        //[Route("api/user/signin")]
        [AllowAnonymous]
        [HttpPost]
        [Route("signin")]
        //public HttpResponseMessage SignIn([FromBody] string userCredential)
        public HttpResponseMessage SignIn()
        {
            try
            {
                var authHeader = Request.Headers.Authorization.ToString();

                if (authHeader != null && authHeader.StartsWith("Basic"))
                {
                    //Extract credentials
                    string userCredential = authHeader.Substring("Basic ".Length).Trim();


                    var userId = _tokenService.CheckUserCredential(userCredential);

                    if (userId != null)
                    {
                        var generatedToken = _tokenService.GenerateToken(userId.GetValueOrDefault());
                        return Request.CreateResponse(HttpStatusCode.Accepted, generatedToken);
                    };
                }
                else
                {
                    //Handle what happens if that isn't the case
                    return Request.CreateResponse(HttpStatusCode.NotAcceptable);
                }

            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Error!");
            }
            return null;
        }

        [AuthorizationRequired]
        [HttpPost]
        public HttpResponseMessage SignOut([FromBody] Guid userId)
        {
            try
            {
                _tokenService.DeleteByUserId(userId);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Error when Sign Out.");
            }
        }

        // Put api/put/5
        [HttpPut]
        [Route("profile")]
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

        // Put api/put/5
        [HttpPut]
        [Route("image")]
        public HttpResponseMessage Put([FromBody] ImageBusinessEntity image)
        {
            try
            {
                if (image != null)
                {
                    _imageService.UpdateImage(image);
                    return Request.CreateResponse(HttpStatusCode.OK);
                }

                return Request.CreateResponse(HttpStatusCode.NotImplemented);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Error!!!");
            }
        }

        // DELETE api/user/5
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

        // Delete Image
        [HttpDelete]
        [Route("favoritelist/{id}")]
        public HttpResponseMessage DeleteProduct(Guid id)
        {
            if (!id.Equals(null))
            {
                _productService.DeleteProduct(id);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            return Request.CreateResponse(HttpStatusCode.NotImplemented, "Not Implemented!");
        }

        // Delete Image
        [HttpDelete]
        [Route("image/{id}")]
        public HttpResponseMessage DeleteImage(Guid id)
        {
            if (!id.Equals(null))
            {
                _imageService.DeleteImage(id);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            return Request.CreateResponse(HttpStatusCode.NotImplemented, "Not Implemented!");
        }

    }
}
