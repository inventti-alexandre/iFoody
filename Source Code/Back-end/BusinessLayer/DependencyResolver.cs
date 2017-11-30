using BusinessLayer.IServices;
using BusinessLayer.Services;
using Resolver;
using System.ComponentModel.Composition;
using IComponent = Resolver.IComponent;

namespace BusinessLayer
{
    [Export(typeof(IComponent))]
    public class DependencyResolver : IComponent
    {
        public void SetUp(IRegisterComponent registerComponent)
        {
            // Mew Mew... Add new Dependency Resolver below 
            registerComponent.RegisterType<IUserService, UserService>();
            registerComponent.RegisterType<IProductService, ProductService>();
            registerComponent.RegisterType<IProductImagesService, ProductImageService>();
            registerComponent.RegisterType<IFavoritesListService, FavoriteListService>();
            registerComponent.RegisterType<ICategoriesService, CategoriesService>();
            registerComponent.RegisterType<ITokenService, TokenService>();
            registerComponent.RegisterType<IImageService, ImageService>();
            registerComponent.RegisterType<IStoreService, StoreService>();
            registerComponent.RegisterType<IReviewService, ReviewService>();
            registerComponent.RegisterType<ICommentService, CommentService>();


        }

        //public void Dispose()
        //{
        //    // throw new NotImplementedException();
        //}

        //public ISite Site { get; set; }
        //public event EventHandler Disposed;
    }
}
