using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using DataModel.IRepository;

namespace DataModel.Repository
{

    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        private iFoodyEntities _iFoodyContext;

        public ProductRepository(iFoodyEntities iFoodyEntities) : base(iFoodyEntities)
        {
            this._iFoodyContext = iFoodyEntities;
        }

        public IEnumerable<Product> GetProductsByListId(List<Guid?> listProductsId)
        {
            if (listProductsId.Any())
            {
                var products =
                    _iFoodyContext.Products.Where(x => listProductsId.Contains(x.Id)).AsQueryable();
                //                var productsFilter = products.GroupBy(x => x.Store.Id).Select(x => x.FirstOrDefault())
                //                                             .OrderByDescending(x => x.Store.Rating).AsQueryable();
                return products;

            }
            else
            {
                return null;
            }
        }

        //Search by product name
        public IEnumerable<Product> GetProductsByName(string name)
        {
            string sql = "select * from Products where FREETEXT(Name,'\"" + name + "\"')";            
            return _iFoodyContext.Database.SqlQuery<Product>(sql).AsQueryable();          
        }
        //Search by category name
        public IEnumerable<Product> SearchByCategoryName(string categoryName)
        {
            IEnumerable<Guid> listCategoriesId = _iFoodyContext.Categories.Where(x => x.Name.Contains(categoryName))
                                                                          .Select(x=>x.Id);
            if (listCategoriesId.Any())
            {
                var products =
                    _iFoodyContext.Products.Where(x => listCategoriesId.Contains(x.Category.Id)).AsQueryable();
                var productsFilter = products.GroupBy(x => x.Store.Id).Select(x => x.FirstOrDefault())
                                             .OrderByDescending(x => x.Store.Rating).AsQueryable();
                return productsFilter;
            }
            else
            {
                return null;
            }
        }

        //Search method: name, address, district, city
        public IEnumerable<Product> SearchByStoreInfo(string searchString)
        {
            string sql = "select Id from StoreSearch where FREETEXT(SearchString,'\"" + searchString + "\"')";
            IEnumerable<Guid> listId = _iFoodyContext.Database.SqlQuery<Guid>(sql);
            if (listId.Any())
            {
                var products = _iFoodyContext.Products.Where(x => listId.Contains(x.Store.Id)).AsQueryable();
                var productsFilter = products.GroupBy(x => x.Store.Id).Select(x => x.FirstOrDefault())
                                             .OrderByDescending(x=>x.Store.Rating).AsQueryable();
                return productsFilter;
            }
            else
            {
                return null;
            }
//            return _iFoodyContext.Database.SqlQuery<Product>(sql).ToList();
        }
    }
}
