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

        }

        //public void Dispose()
        //{
        //    // throw new NotImplementedException();
        //}

        //public ISite Site { get; set; }
        //public event EventHandler Disposed;
    }
}
