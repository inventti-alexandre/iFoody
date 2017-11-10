using DataModel.IRepository;

namespace DataModel.IUnitOfWork
{
    public interface IUnitOfWork
    {
        ICategoryRepository Categories { get; }
        ICommentRepository Comments { get; }
        IFavoriteListRepository FavoriteLists { get; }
        IImageRepository Images { get; }
        IProductImageRepository ProductImages { get; }
        IProductRepository Products { get; }
        IReviewRepository Reviews { get; }
        IStoreImageRepository StoreImages { get; }
        IStoreRepository Stores { get; }
        IUserImageRepository UserImages { get; }
        IUserRepository Users { get; }
        ITokenRepository Tokens { get; }

        void Complete();
    }
}
