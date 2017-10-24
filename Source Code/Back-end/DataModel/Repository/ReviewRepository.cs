using DataModel.IRepository;

namespace DataModel.Repository
{
    public class ReviewRepository : GenericRepository<Review>, IReviewRepository
    {
        private iFoodyEntities _iFoodyContext;

        public ReviewRepository(iFoodyEntities iFoodyEntities) : base(iFoodyEntities)
        {
            this._iFoodyContext = iFoodyEntities;
        }
    }
}
