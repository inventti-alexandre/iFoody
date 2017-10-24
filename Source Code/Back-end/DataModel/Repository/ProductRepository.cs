using DataModel.IRepository;

namespace DataModel.Repository
{

    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        private iFoodyEntities _iFoodyContext;

        public ProductRepository(iFoodyEntities iFoodyEntities) : base(iFoodyEntities)
        {
            this._iFoodyContext = iFoodyEntities;
        }
    }
}
