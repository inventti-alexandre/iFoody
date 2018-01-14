using System;

namespace DataModel.IRepository
{
    public interface IUserRepository : IGenericRepository<User>
    {
        // Check Exist User with Email
        bool EmailExist(string email);

        // Update HasStore Property
        bool UpdateHasStoreProperty(Guid id);
    }
}
