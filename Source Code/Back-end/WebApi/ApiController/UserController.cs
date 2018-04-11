using BusinessEntities;
using BusinessLayer.DTOs;
using BusinessLayer.IServices;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Routing;
using WebApi.ActionFilters;

namespace WebApi.ApiController
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/users")]
    public class UserController : System.Web.Http.ApiController
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;
        private readonly IImageService _imageService;
        private readonly IProductService _productService;
        private readonly IStoreService _storeService;
        private readonly IReviewService _reviewService;
        private readonly ICommentService _commentService;
        private readonly IFavoritesListService _favoritesListService;
        private readonly IUploadService _uploadService;
        private readonly ILocationService _locationService;

        public UserController(
            IUserService userService,
            ITokenService tokenService,
            IImageService imageService,
            IProductService productService,
            IStoreService storeService,
            IReviewService reviewService,
            ICommentService commentService,
            IFavoritesListService favoritesListService,
            IUploadService uploadService,
            ILocationService locationService)
        {
            _userService = userService;
            _tokenService = tokenService;
            _imageService = imageService;
            _productService = productService;
            _storeService = storeService;
            _reviewService = reviewService;
            _commentService = commentService;
            _favoritesListService = favoritesListService;
            _uploadService = uploadService;
            _locationService = locationService;
        }

        // Get api/user
        [HttpGet]
        [Route("getAll")]
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
        [Route("{id?}")]
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

        // GET api/user/favorite-list/42fsvvsg0-gsevsevsev
        [HttpGet]
        [Route("favorite-list/{id?}")]
        public HttpResponseMessage GetFavoriteList(Guid id)
        {
            try
            {
                var favoriteList = _favoritesListService.GetFavoriteByUserId(id).ToList();
                if (favoriteList.Count > 0)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, favoriteList);
                }
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Got Exception");
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No Favorite Item found for this user");
        }

        // GET api/user/store/42fsvvsg0-gsevsevsev...
        [HttpGet]
        [Route("store/{id?}")]
        public HttpResponseMessage GetStore(Guid id)
        {
            try
            {
                var store = _storeService.GetStoreById(id);
                if (store != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, store);
                }
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Got Exception");
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No Store found");
        }

        // GET api/users/store/{storeId?}/allProducts
        [HttpGet]
        [Route("store/allProducts/{storeId?}")]
        public HttpResponseMessage GetProductInStore(Guid storeId)
        {
            try
            {
                var products = _productService.GetProductByStoreId(storeId);
                if (products != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, products);
                }
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Got Exception");
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No Products found");
        }

        // TEST
        // GET api/user/store/location/
        [HttpGet]
        [Route("store/location")]
        public HttpResponseMessage TestLocation()
        {
            try
            {
                var storeIdList = new List<Guid>();
                storeIdList.Add(new Guid("7dfce7c0-e926-4661-a9e5-62d3b8157a25"));

                storeIdList.Add(new Guid("f3ff0e22-228b-4284-b2ff-14605ada65ac"));

                var locationEntityList = new List<LocationBusinessEntity>();

                var test = _locationService.FindNearestLocations(10.7649418, 106.6637336, storeIdList);

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Got Exception");
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No Store found");
        }

        // POST api/user
        [HttpPost]
        [Route("signup")]
        //[Route("api/user/signup")]
        public HttpResponseMessage Post([FromBody] UserBusinessEntity user)
        {
            try
            {
                var signUpUserId = _userService.SignUp(user);
                return Request.CreateResponse(HttpStatusCode.OK, signUpUserId);
            }
            catch (CookieException e)
            {
                return Request.CreateResponse(HttpStatusCode.NotImplemented);
            }
        }

        // POST api/user/upload
        // Upload Image
        [HttpPost]
        [Route("upload")]
        public HttpResponseMessage Post([FromBody] List<string> images)
        {
            try
            {
                if (images != null)
                {
                    var authToken = Request.Headers.GetValues("Token").FirstOrDefault();
                    var userToken = _tokenService.GetUserId(authToken);
                    //_imageService.UploadImage(images, userToken.GetValueOrDefault(), null);

                    return Request.CreateResponse(HttpStatusCode.OK);
                }
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Cannot upload Images");
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Error unexpected");
            }
        }

        // POST api/user/review
        [HttpPost]
        [Route("review")]
        public HttpResponseMessage Post([FromBody] ReviewBusinessEntity review)
        {
            try
            {
                if (review != null)
                {
                    var authToken = Request.Headers.GetValues("Token").FirstOrDefault();
                    var userToken = _tokenService.GetUserId(authToken);

                    var reviewId = _reviewService.InsertReview(review);
                    if (reviewId != Guid.Empty)
                    {
                        _productService.UpdateRatingProperty(review.ProductId.GetValueOrDefault(), Convert.ToInt32(Math.Round(review.Rating)));
                        _storeService.UpdateRatingProperty(review.StoreId.GetValueOrDefault(), Convert.ToInt32(Math.Round(review.Rating)));
                        return Request.CreateResponse(HttpStatusCode.OK, reviewId);
                    }
                }
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Cannot Insert Review");
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Error unexpected");
            }
        }

        // POST api/user/openStore
        [HttpPost]
        [Route("open-store")]
        public HttpResponseMessage Post([FromBody] OpenStoreDto openStoreDto)
        {
            try
            {
                if (openStoreDto == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Cannot Open Store");
                }
                var authToken = Request.Headers.GetValues("Token").FirstOrDefault();
                var userToken = _tokenService.GetUserId(authToken);

                //Mapper.CreateMap<OpenStoreDto, StoreDto>().ForMember(x => x.Images, opt => opt.Ignore()); ;
                //var storeDto = Mapper.Map<OpenStoreDto, StoreDto>(openStoreDto);

                // Save Store
                openStoreDto.RegistrationDate = DateTime.Today;
                var storeId = _storeService.OpenStore(openStoreDto);
                /////////////////////////////

                /////////////////////////////////
                return Request.CreateResponse(HttpStatusCode.OK, storeId);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Error unexpected");
            }
        }

        // POST api/user/comment
        [HttpPost]
        [Route("comment")]
        public HttpResponseMessage Post([FromBody] CommentBusinessEntity comment)
        {
            try
            {
                if (comment != null)
                {
                    var authToken = Request.Headers.GetValues("Token").FirstOrDefault();
                    var userToken = _tokenService.GetUserId(authToken);

                    _commentService.InsertComment(comment);

                    return Request.CreateResponse(HttpStatusCode.OK, comment.Id);
                }
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Cannot upload Images");
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Error unexpected");
            }
        }

        //POST api/user/favorite-list
        [HttpPost]
        [Route("favorite-list")]
        public HttpResponseMessage Post([FromBody] FavoriteListBusinessEntity favoriteListEntity)
        {
            try
            {
                var favoriteItemId = _favoritesListService.InsertFavoriteItem(favoriteListEntity);
                if (favoriteItemId != Guid.Empty)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, favoriteItemId);
                }
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Cannot insert Favorite Item.");
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception unexpected.");
            }
        }

        // Sign In
        //[Route("api/user/signin")]
        [AllowAnonymous]
        [HttpPost]
        [Route("signin")]
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

        // Sign Out...
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

        //// Open Store
        //// Post api/user/store
        //[HttpPost]
        //[Route("store")]
        //public HttpResponseMessage Post([FromBody] StoreBusinessEntity store, [FromBody] List<ImageBusinessEntity> images)
        //{
        //    try
        //    {
        //        if (store != null)
        //        {
        //            var storeId = _storeService.OpenStore(store);

        //            if (images != null)
        //            {
        //                var authToken = Request.Headers.GetValues("Token").FirstOrDefault();
        //                var userToken = _tokenService.GetUserId(authToken);
        //                //_imageService.UploadImage(images, userToken.GetValueOrDefault(), storeId);

        //                return Request.CreateResponse(HttpStatusCode.OK, storeId);
        //            }
        //            return Request.CreateResponse(HttpStatusCode.OK, storeId);
        //        }
        //        return Request.CreateResponse(HttpStatusCode.NotImplemented);
        //    }
        //    catch (Exception)
        //    {
        //        return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception error");
        //    }
        //}

        // Put api/user/put/5
        [HttpPut]
        [Route("{id}")]
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

        // Put api/user/put/5
        [HttpPut]
        [Route("image")]
        public HttpResponseMessage Put([FromBody] ImageBusinessEntity image)
        {
            try
            {
                if (image != null)
                {
                    _imageService.UpdateImage(image);
                    return Request.CreateResponse(HttpStatusCode.OK, image.Id);
                }

                return Request.CreateResponse(HttpStatusCode.NotImplemented);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Error!!!");
            }
        }

        // Put api/user/store
        [HttpPut]
        [Route("store/{id?}")]
        public HttpResponseMessage Put(Guid id, [FromBody] OpenStoreDto openStoreDto)
        {
            try
            {
                if (openStoreDto == null)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Cannot Update Store");
                }
                var authToken = Request.Headers.GetValues("Token").FirstOrDefault();
                var userToken = _tokenService.GetUserId(authToken);

                _storeService.UpdateStore(openStoreDto);

                return Request.CreateResponse(HttpStatusCode.OK, openStoreDto.Id);

            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Error!!!");
            }
        }

        [HttpPut]
        [Route("review")]
        public HttpResponseMessage Put([FromBody] ReviewBusinessEntity review)
        {
            try
            {
                if (review != null)
                {
                    _reviewService.UpdateReview(review);
                    return Request.CreateResponse(HttpStatusCode.OK, review.Id);
                }

                return Request.CreateResponse(HttpStatusCode.NotImplemented);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Error!!!");
            }
        }

        // PUT api/user/comment/5
        [HttpPut]
        [Route("comment")]
        public HttpResponseMessage Put([FromBody] CommentBusinessEntity comment)
        {
            try
            {
                if (comment != null)
                {
                    _commentService.UpdateComment(comment);
                    return Request.CreateResponse(HttpStatusCode.OK, comment.Id);
                }

                return Request.CreateResponse(HttpStatusCode.NotImplemented);
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Error!!!");
            }
        }

        [HttpPut]
        [Route("change-password")]
        public HttpResponseMessage Put()
        {
            try
            {
                var authHeader = Request.Headers.Authorization.ToString();

                if (authHeader != "" && authHeader.StartsWith("Basic"))
                {
                    //Extract Credentials
                    string userCredentialWithNewPassword = authHeader.Substring("Basic ".Length).Trim();

                    var decodedBase64String = _tokenService.DecodedStringBase64(userCredentialWithNewPassword);
                    // Extract Old Credential without newPassword
                    // var startSemiColonIndex = decodedBase64String.IndexOf(":");
                    // var secondSemiColonIndex = decodedBase64String.IndexOf(":",
                    // userCredentialWithNewPassword.IndexOf(":") + 1);
                    // var email = userCredentialWithNewPassword.Substring(0, startSemiColonIndex);
                    var email = decodedBase64String[0];
                    // Get Old and New User Credential
                    //string oldUserCredential = userCredentialWithNewPassword.Substring(0, secondSemiColonIndex);
                    var oldUserCredential = String.Join(":", new string[2] { email, decodedBase64String[1] });
                    //                    string[] newUserCredentialArray = new string[2]; // Include Email and New Password
                    //                  newUserCredentialArray[0] = email;
                    //                newUserCredentialArray[1] = decodedBase64String[2];
                    var newUserCredential = String.Join(":", new string[2] { email, decodedBase64String[2] });

                    // Encode Credential 
                    var encodedOldUserCredential = this._tokenService.EncodedStringBase64(oldUserCredential);
                    var encodedNewUserCredential = this._tokenService.EncodedStringBase64(newUserCredential);
                    // Check Old User Credential
                    var userId = _tokenService.CheckUserCredential(encodedOldUserCredential);
                    /////////////////////////////

                    if (userId != null)
                    {
                        // Old Credential is OK
                        if (this._userService.UpdateUserPassword(encodedNewUserCredential))
                        {
                            return Request.CreateResponse(HttpStatusCode.OK);
                        };
                        return Request.CreateResponse(HttpStatusCode.NotImplemented);
                    }
                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.Unauthorized);
                    }
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

        //// Delete Product In Favorite List
        //[HttpDelete]
        //[Route("favorite-list/{id}")]
        //public HttpResponseMessage DeleteProductInFavoriteList(Guid id)
        //{
        //    if (!id.Equals(null))
        //    {
        //        _favoritesListService.DeleteFavoriteItem(id);
        //        return Request.CreateResponse(HttpStatusCode.OK);
        //    }
        //    return Request.CreateResponse(HttpStatusCode.NotImplemented, "Not Implemented!");
        //}


        // Delete Image
        //[HttpDelete]
        //[Route("image/{id}")]
        //public HttpResponseMessage DeleteImage(Guid id)
        //{
        //    try
        //    {
        //        if (!id.Equals(null))
        //        {
        //            _imageService.DeleteImage(id);
        //            return Request.CreateResponse(HttpStatusCode.OK);
        //        }
        //        return Request.CreateResponse(HttpStatusCode.NotImplemented, "Not Implemented!");
        //    }
        //    catch (Exception e)
        //    {
        //        return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Fail!");
        //    }
        //}

        // Delete Review
        [HttpDelete]
        [Route("review/{id}")]
        public HttpResponseMessage DeleteReview(Guid id)
        {
            try
            {
                _reviewService.DeleteReview(id);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "Exception Fail!");
            }
        }

        // DELETE Comment
        [HttpDelete]
        [Route("comment/{id}")]
        public HttpResponseMessage DeleteComment(Guid id)
        {
            try
            {
                _commentService.DeleteComment(id);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed, "Exception Fail!");
            }
        }


        // DELETE api/favoritelist/
        [HttpDelete]
        [Route("favorite-list/{item?}")]
        public HttpResponseMessage Delete([FromUri]string item)
        {
            try
            {
                // var favoriteItem = new JavaScriptSerializer().Deserialize<string>(item);
                var jsonObject = JObject.Parse(item);

                var userId = (jsonObject.SelectToken("userId").ToString() != "")
                                    ? new Guid(jsonObject.SelectToken("userId").ToString())
                                    : new Guid();

                var productId = (jsonObject.SelectToken("productId").ToString() != "")
                                    ? new Guid(jsonObject.SelectToken("productId").ToString())
                                    : new Guid();

                var storeId = (jsonObject.SelectToken("storeId").ToString() != "")
                                    ? new Guid(jsonObject.SelectToken("storeId").ToString())
                                    : new Guid();


                if (userId == Guid.Empty || (productId == Guid.Empty && storeId == Guid.Empty))
                {
                    return Request.CreateErrorResponse(HttpStatusCode.NotAcceptable, "Not Acceptable Parameter");
                }


                // var favoriteBusinessEntity = _favoritesListService.GetFavoriteId(productId, storeId);
                var favoriteItemDto = new FavoriteListDto()
                {
                    UserId = userId,
                    ProductId = productId,
                    StoreId = storeId
                };

                //Mapper.CreateMap<FavoriteListDto, FavoriteListBusinessEntity>().ForMember(x => x.Id, opt => opt.Ignore()); ;
                //var favoriteItemBusinessEntity = Mapper.Map<FavoriteListDto, FavoriteListBusinessEntity>(favoriteItemDto);


                var success = _favoritesListService.DeleteFavoriteItem(favoriteItemDto);
                if (success)
                {
                    return Request.CreateResponse(HttpStatusCode.OK);
                }

                return Request.CreateErrorResponse(HttpStatusCode.NotModified, "Not delete Item yet");
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception unexpected");
            }
        }

        // DELETE api/image/
        [HttpDelete]
        [Route("image/{id?}")]
        public HttpResponseMessage DeleteImage(Guid id)
        {
            try
            {
                if (_uploadService.DeleteFile(id))
                {
                    if (_imageService.DeleteStoreImage(id))
                    {
                        {
                            return Request.CreateResponse(HttpStatusCode.OK);
                        }
                    }
                    return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Not Delete StoreImage in table yet");
                }
                return Request.CreateErrorResponse(HttpStatusCode.NotImplemented, "Not Implemented!");
            }
            catch (Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, "Exception Error!");
            }
        }
    }
}
