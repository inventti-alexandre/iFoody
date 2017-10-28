using System;
using System.Security.Principal;

namespace WebApi.Filters
{
    public class BasicAuthenticationIdentity : GenericIdentity
    {
        public string Email { get; set; }

        public string Password { get; set; }

        public Guid UserId { get; set; }

        // Basic Authentication Identity Constructor
        public BasicAuthenticationIdentity(string email, string password) : base(email, "Basic")
        {
            Email = email;
            Password = password;
        }
    }
}