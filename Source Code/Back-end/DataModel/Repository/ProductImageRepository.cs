using DataModel.IRepository;

namespace DataModel.Repository
{
    public class ProductImageRepository : GenericRepository<ProductImage>, IProductImageRepository
    {
        private iFoodyEntities _iFoodyContext;

        public ProductImageRepository(iFoodyEntities iFoodyEntities) : base(iFoodyEntities)
        {
            this._iFoodyContext = iFoodyEntities;
        }
    }
}
