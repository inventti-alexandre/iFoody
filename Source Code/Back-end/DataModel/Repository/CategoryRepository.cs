using DataModel.IRepository;

namespace DataModel.Repository
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        private iFoodyEntities _iFoodyContext;

        public CategoryRepository(iFoodyEntities iFoodyEntities) : base(iFoodyEntities)
        {
            this._iFoodyContext = iFoodyEntities;
        }
    }
}
