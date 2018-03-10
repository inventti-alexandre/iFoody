using System.Collections.Generic;

namespace DataModel.IRepository
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        IEnumerable<Product> GetProductsByName(string name);
        IEnumerable<Product> SearchByStoreInfo(string searchString);
        IEnumerable<Product> SearchByCategoryName(string categoryName);
    }
}
