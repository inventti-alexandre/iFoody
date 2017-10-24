using DataModel.IRepository;
using DataModel.Repository;


namespace DataModel.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork.IUnitOfWork
    {
        private readonly iFoodyEntities _iFoodyContext;

        public ICategoryRepository Category { get; set; }
        public ICommentRepository Comment { get; set; }
        public IFavoriteListRepository Favorite { get; set; }
        public IImageRepository Image { get; set; }
        public IProductImageRepository ProductImage { get; set; }
        public IProductRepository Product { get; set; }
        public IReviewRepository Review { get; set; }
        public IStoreImageRepository StoreImage { get; set; }
        public IStoreRepository Store { get; set; }
        public IUserImageRepository UserImage { get; set; }
        public IUserRepository User { get; set; }

        // Constructor for Creating Context
        public UnitOfWork()
        {
            this._iFoodyContext = new iFoodyEntities();
            Category = new CategoryRepository(_iFoodyContext);
            Comment = new CommentRepository(_iFoodyContext);
            Favorite = new FavoriteListRepository(_iFoodyContext);
            Image = new ImageRepository(_iFoodyContext);
            ProductImage = new ProductImageRepository(_iFoodyContext);
            Product = new ProductRepository(_iFoodyContext);
            Review = new ReviewRepository(_iFoodyContext);
            StoreImage = new StoreImageRepository(_iFoodyContext);
            Store = new StoreRepository(_iFoodyContext);
            UserImage = new UserImageRepository(_iFoodyContext);
            User = new UserRepository(_iFoodyContext);
        }

        // Complete One transaction 
        public void Complete()
        {
            this._iFoodyContext.SaveChanges();
        }
    }
}
