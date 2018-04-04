using System;
using System.Collections.Generic;
using DataModel.Repository;

namespace DataModel.IRepository
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        IEnumerable<Product> GetProductsByName(string name);
        IEnumerable<Product> SearchByStoreInfo(string searchString);
        IEnumerable<Product> SearchByCategoryName(string categoryName);
        IEnumerable<Product> GetProductsByListId(List<Guid?> listProductsId);
        List<SearchReturn> Search(string input);

    }
}
