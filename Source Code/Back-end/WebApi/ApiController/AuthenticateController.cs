using AttributeRouting.Web.Http;
using BusinessLayer.IServices;
using System;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Web.Http.Cors;
using WebApi.Filters;

namespace WebApi.ApiController
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [ApiAuthenticationFilter]
    public class AuthenticateController : System.Web.Http.ApiController
    {
        private readonly ITokenService _tokenService;

        public AuthenticateController(ITokenService tokenService)
        {
            _tokenService = tokenService;
        }

        [POST("signup")]
        public HttpResponseMessage Authenticate()
        {
            if (System.Threading.Thread.CurrentPrincipal != null && System.Threading.Thread.CurrentPrincipal.Identity.IsAuthenticated)
            {
                var basicAuthenticationIdentity = System.Threading.Thread.CurrentPrincipal.Identity as BasicAuthenticationIdentity;
                if (basicAuthenticationIdentity != null)
                {
                    var userId = basicAuthenticationIdentity.UserId;
                    return GetAuthToken(userId);
                }
            }
            return null;
        }

        private HttpResponseMessage GetAuthToken(Guid userId)
        {
            var token = _tokenService.GenerateToken(userId);
            var response = Request.CreateResponse(HttpStatusCode.OK, "Authorized");
            response.Headers.Add("Token", token.AuthToken);
            response.Headers.Add("TokenExpiry", ConfigurationManager.AppSettings["AuthTokenExpiry"]);
            response.Headers.Add("Access-Control-Expose-Headers", "Token,TokenExpiry");
            return response;
        }

    }
}
