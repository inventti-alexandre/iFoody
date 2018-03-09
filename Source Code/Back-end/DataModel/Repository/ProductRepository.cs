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
        //Search method
        public IEnumerable<Product> GetProductsByName(string name)
        {
            string sql = "select * from Products where FREETEXT(Name,'\"" + name + "\"')";            
            return _iFoodyContext.Database.SqlQuery<Product>(sql).ToList();          
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
                                             .OrderByDescending(x=>x.Store.Rating);
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
