using BusinessLayer.IServices;
using System.Threading;
using System.Web.Http.Controllers;

namespace WebApi.Filters
{
    public class ApiAuthenticationFilter : GenericAuthenticationFilter
    {
        // Public Authentication Constructor
        public ApiAuthenticationFilter()
        {
        }

        // Public Authentication Constructor with isActive parameter
        public ApiAuthenticationFilter(bool isActive) : base(isActive)
        {
        }

        //  Protected overriden method for authorizing user
        protected override bool OnAuthorizeUser(string email, string password, HttpActionContext actionContext)
        {
            var provider =
                actionContext.ControllerContext.Configuration.DependencyResolver.GetService(typeof(IUserService)) as
                    IUserService;

            if (provider != null)
            {
                var userId = provider.Authenticate(email, password);
                if (userId != null)
                {
                    var basicAuthenticationIdentity = Thread.CurrentPrincipal.Identity as BasicAuthenticationIdentity;

                    if (basicAuthenticationIdentity != null)
                    {
                        basicAuthenticationIdentity.UserId = userId;
                    }
                    return true;
                }
            }
            return false;
        }
    }
}