using DataModel.IRepository;

namespace DataModel.Repository
{
    public class StoreImageRepository : GenericRepository<StoreImage>, IStoreImageRepository
    {
        private iFoodyEntities _iFoodyContext;

        public StoreImageRepository(iFoodyEntities iFoodyEntities) : base(iFoodyEntities)
        {
            this._iFoodyContext = iFoodyEntities;
        }
    }
}
