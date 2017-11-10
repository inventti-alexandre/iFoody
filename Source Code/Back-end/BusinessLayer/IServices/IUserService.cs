using BusinessEntities;
using System;
using System.Collections.Generic;

namespace BusinessLayer.IServices
{
    public interface IUserService
    {
        IEnumerable<UserBusinessEntity> GetAllUsers();
        UserBusinessEntity GetUserById(Guid id);
        bool UpdateUser(Guid userId, UserBusinessEntity userEntity);
        bool DeleteUser(Guid userId);
        Guid? SignUp(UserBusinessEntity user);
        Guid? Authenticate(string email, string password);
    }
}
