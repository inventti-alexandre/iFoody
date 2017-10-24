using DataModel.IRepository;

namespace DataModel.Repository
{
    public class StoreRepository : GenericRepository<Store>, IStoreRepository
    {
        private iFoodyEntities _iFoodyContext;

        public StoreRepository(iFoodyEntities iFoodyEntities) : base(iFoodyEntities)
        {
            this._iFoodyContext = iFoodyEntities;
        }
    }
}
