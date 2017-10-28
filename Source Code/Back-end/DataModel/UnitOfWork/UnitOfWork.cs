using DataModel.IRepository;
using DataModel.Repository;

namespace DataModel.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork.IUnitOfWork
    {
        private readonly iFoodyEntities _iFoodyContext;

        public ICategoryRepository Categories { get; private set; }
        public ICommentRepository Comments { get; private set; }
        public IFavoriteListRepository FavoriteLists { get; private set; }
        public IImageRepository Images { get; set; }
        public IProductImageRepository ProductImages { get; private set; }
        public IProductRepository Products { get; private set; }
        public IReviewRepository Reviews { get; private set; }
        public IStoreImageRepository StoreImages { get; private set; }
        public IStoreRepository Stores { get; private set; }
        public IUserImageRepository UserImages { get; private set; }
        public IUserRepository Users { get; private set; }



        // Constructor for Creating Context
        public UnitOfWork(iFoodyEntities iFoodyContext)
        {
            _iFoodyContext = iFoodyContext;
            Categories = new CategoryRepository(_iFoodyContext);
            Comments = new CommentRepository(_iFoodyContext);
            FavoriteLists = new FavoriteListRepository(_iFoodyContext);
            Images = new ImageRepository(_iFoodyContext);
            ProductImages = new ProductImageRepository(_iFoodyContext);
            Products = new ProductRepository(_iFoodyContext);
            Reviews = new ReviewRepository(_iFoodyContext);
            StoreImages = new StoreImageRepository(_iFoodyContext);
            Stores = new StoreRepository(_iFoodyContext);
            UserImages = new UserImageRepository(_iFoodyContext);
            Users = new UserRepository(_iFoodyContext);
        }

        // Complete One transaction 
        public void Complete()
        {
            this._iFoodyContext.SaveChanges();
        }
    }
}