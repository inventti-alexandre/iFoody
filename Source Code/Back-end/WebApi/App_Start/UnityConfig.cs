using BusinessLayer.IServices;
using BusinessLayer.Services;
using Microsoft.Practices.Unity;
using Resolver;
using System.Web.Http;
using System.Web.Mvc;

namespace WebApi
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var container = BuildUnityContainer();

            DependencyResolver.SetResolver(new Unity.Mvc5.UnityDependencyResolver(container));

            // register dependency resolver for WebAPI RC
            GlobalConfiguration.Configuration.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(container);
        }
        private static IUnityContainer BuildUnityContainer()
        {
            var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers
            RegisterTypes(container);
            // e.g. container.RegisterType<ITestService, TestService>();
            //0container.RegisterType<IUserService, UserService>().RegisterType<UnitOfWork>(new HierarchicalLifetimeManager());

            return container;
        }

        public static void RegisterTypes(IUnityContainer container)
        {

            //Component initialization via MEF
            ComponentLoader.LoadContainer(container, ".\\bin", "WebApi*.dll");
            ComponentLoader.LoadContainer(container, ".\\bin", "BusinessLayer.dll");
            ComponentLoader.LoadContainer(container, ".\\bin", "DataModel.dll");

        }
    }
}