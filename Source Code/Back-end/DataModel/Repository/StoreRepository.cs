using System.Linq;
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
        public int GetTotalStores()
        {
            //by product
            string sql = "select Count(1) from Stores";
            int result = _iFoodyContext.Database.SqlQuery<int>(sql).FirstOrDefault();
            return result;
        }
    }
}
