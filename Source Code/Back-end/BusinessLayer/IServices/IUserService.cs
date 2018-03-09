using BusinessEntities;
using System;
using System.Collections.Generic;

namespace BusinessLayer.IServices
{
    public interface IUserService
    {
        IEnumerable<UserBusinessEntity> GetAllUsers();
        UserBusinessEntity GetUserById(Guid id);
        bool UpdateHasStoreProperty(Guid userId);
        bool UpdateUser(Guid userId, UserBusinessEntity userEntity);
        bool UpdateUserPassword(string userCredential);
        bool DeleteUser(Guid userId);
        Guid? SignUp(UserBusinessEntity user);
        Guid? Authenticate(string email, string password);
        bool CheckReviewExist(Guid? userId, Guid? reviewId);
    }
}
