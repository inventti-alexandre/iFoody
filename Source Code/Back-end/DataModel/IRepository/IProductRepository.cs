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
        List<ProductReturn> GetProductInfo();
        List<SearchReturn> Search(string input);
        List<SearchReturn> GetStoreReturnByListId(List<Guid> listStoreId);
        int GetTotalProducts();
    }
}
