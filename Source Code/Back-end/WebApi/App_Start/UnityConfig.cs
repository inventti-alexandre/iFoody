using Microsoft.Practices.Unity;
using Resolver;
using System.Web.Http;
using Unity.WebApi;


namespace WebApi
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var container = new UnityContainer();
            System.Web.Mvc.DependencyResolver.SetResolver(new UnityDependencyResolver(container));
            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // Code nay cua Tuan dep chai va Mew dep gai. 
            //container.RegisterType<IUserService, UserService>()
            //.RegisterType<IUnitOfWork, UnitOfWork>(new HierarchicalLifetimeManager());
            // End Code Tuan dep chai
            // e.g. container.RegisterType<ITestService, TestService>();

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }

        private static IUnityContainer UnityContainer()
        {
            var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();       
            // container.RegisterType<IProductServices, ProductServices>().RegisterType<UnitOfWork>(new HierarchicalLifetimeManager());

            RegisterTypes(container);

            return container;
        }
        public static void RegisterTypes(IUnityContainer container)
        {

            //Component initialization via MEF
            ComponentLoader.LoadContainer(container, ".\\bin", "WebApi.dll");
            ComponentLoader.LoadContainer(container, ".\\bin", "BusinessLayer.dll");

        }
    }
}