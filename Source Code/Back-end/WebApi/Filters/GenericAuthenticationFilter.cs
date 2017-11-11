using System;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace WebApi.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false)]
    public class GenericAuthenticationFilter : AuthorizationFilterAttribute
    {
        private readonly bool _isActive = true;

        // Public default Constructor
        public GenericAuthenticationFilter()
        {
        }

        public GenericAuthenticationFilter(bool isActive)
        {
            this._isActive = isActive;
        }

        // Check basic Anthetication request
        public override void OnAuthorization(HttpActionContext filterContext)
        {
            if (!_isActive) return;

            var identity = FetchAuthHeader(filterContext);
            if (identity == null)
            {
                ChallengeAuthRequest(filterContext);
                return;
            }

            var genericPrincipal = new GenericPrincipal(identity, null);
            Thread.CurrentPrincipal = genericPrincipal;

            if (!OnAuthorizeUser(identity.Email, identity.Password, filterContext))
            {
                ChallengeAuthRequest(filterContext);
                return;
            }

            base.OnAuthorization(filterContext);
        }

        // Challenge the Authentication Challenge Request
        private void ChallengeAuthRequest(HttpActionContext filterContext)
        {
            var dnsHost = filterContext.Request.RequestUri.DnsSafeHost;

            filterContext.Response = filterContext.Request.CreateResponse(HttpStatusCode.Unauthorized);

            filterContext.Response.Headers.Add("WWW-Authenticate", string.Format("Basic realm=\"{0}\"", dnsHost));
        }

        // Checks for autrhorization header in the request and parses it, creates user credentials and returns as BasicAuthenticationIdentity
        protected virtual BasicAuthenticationIdentity FetchAuthHeader(HttpActionContext filterContext)
        {
            string authHeaderValue = null;
            var authRequest = filterContext.Request.Headers.Authorization;
            if (authRequest == null)
            {
                return null;
            }

            if (!String.IsNullOrEmpty(authRequest.Scheme) && authRequest.Scheme == "Basic")
            {
                authHeaderValue = authRequest.Parameter;
            }

            if (string.IsNullOrEmpty(authHeaderValue))
            {
                return null;
            }

            authHeaderValue = Encoding.Default.GetString(Convert.FromBase64String(authHeaderValue));

            var credentials = authHeaderValue.Split(':');

            return credentials.Length < 2 ? null : new BasicAuthenticationIdentity(credentials[0], credentials[1]);
        }

        // Virtual method.Can be overriden with the custom Authorization.
        protected virtual bool OnAuthorizeUser(string email, string password, HttpActionContext filterContext)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                return false;
            }
            return true;
        }

    }
}