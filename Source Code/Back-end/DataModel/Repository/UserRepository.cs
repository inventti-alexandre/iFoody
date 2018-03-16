using DataModel.IRepository;
using System;
using System.Linq;

namespace DataModel.Repository
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        private readonly iFoodyEntities _iFoodyContext;

        public UserRepository(iFoodyEntities iFoodyEntities) : base(iFoodyEntities)
        {
            this._iFoodyContext = iFoodyEntities;
        }

        // Check Exist User with Email
        public bool EmailExist(string email)
        {
            var firstOrDefault = _iFoodyContext.Users.FirstOrDefault(e => e.Email == email);
            return firstOrDefault != null;
        }

        // Update HasStore Property
        public bool UpdateHasStoreProperty(Guid id)
        {
            try
            {
                var currentUser = _iFoodyContext.Users.FirstOrDefault(u => u.Id == id);
                if (currentUser != null)
                {
                    currentUser.HasStore = true;
                    return true;
                }
                return false;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
