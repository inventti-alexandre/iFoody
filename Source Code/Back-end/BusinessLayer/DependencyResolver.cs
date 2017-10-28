using BusinessLayer.IServices;
using BusinessLayer.Services;
using Resolver;
using System;
using System.ComponentModel;
using System.ComponentModel.Composition;

namespace BusinessLayer
{
    [Export(typeof(IComponent))]
    public class DependencyResolver : IComponent
    {
        public void SetUp(IRegisterComponent registerComponent)
        {
            // Mew Mew... Add new Dependency Resolver below 
            registerComponent.RegisterType<IUserService, UserService>();

        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public ISite Site { get; set; }
        public event EventHandler Disposed;
    }
}
