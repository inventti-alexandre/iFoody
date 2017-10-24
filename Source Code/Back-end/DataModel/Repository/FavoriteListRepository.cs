using DataModel.IRepository;

namespace DataModel.Repository
{
    public class FavoriteListRepository : GenericRepository<FavoriteList>, IFavoriteListRepository
    {
        private iFoodyEntities _iFoodyContext;

        public FavoriteListRepository(iFoodyEntities iFoodyEntities) : base(iFoodyEntities)
        {
            this._iFoodyContext = iFoodyEntities;
        }
    }
}
