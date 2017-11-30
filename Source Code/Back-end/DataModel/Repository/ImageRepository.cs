using DataModel.IRepository;

namespace DataModel.Repository
{
    public class ImageRepository : GenericRepository<Image>, IImageRepository
    {
        private iFoodyEntities _iFoodyContext;

        public ImageRepository(iFoodyEntities iFoodyEntities) : base(iFoodyEntities)
        {
            this._iFoodyContext = iFoodyEntities;
        }
    }
}
