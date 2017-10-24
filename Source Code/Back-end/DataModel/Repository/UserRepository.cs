using DataModel.IRepository;

namespace DataModel.Repository
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        private iFoodyEntities _iFoodyContext;

        public UserRepository(iFoodyEntities iFoodyEntities) : base(iFoodyEntities)
        {
            this._iFoodyContext = iFoodyEntities;
        }
    }
}
