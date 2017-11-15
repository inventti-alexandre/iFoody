using DataModel.IRepository;
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
    }
}
