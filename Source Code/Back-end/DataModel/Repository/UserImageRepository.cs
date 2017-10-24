using DataModel.IRepository;

namespace DataModel.Repository
{
    public class UserImageRepository : GenericRepository<UserImage>, IUserImageRepository
    {
        private iFoodyEntities _iFoodyContext;

        public UserImageRepository(iFoodyEntities iFoodyEntities) : base(iFoodyEntities)
        {
            this._iFoodyContext = iFoodyEntities;
        }
    }
}
