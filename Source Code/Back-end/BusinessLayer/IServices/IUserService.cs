using BusinessEntities;
using System;
using System.Collections.Generic;

namespace BusinessLayer.IServices
{
    public interface IUserService
    {
        Guid Authenticate(string email, string password);
        IEnumerable<UserBusinessEntity> GetAllUsers();
    }
}
