using System;

namespace BusinessLayer.IServices
{
    public interface IUserService
    {
        Guid Authenticate(string email, string password);
    }
}
