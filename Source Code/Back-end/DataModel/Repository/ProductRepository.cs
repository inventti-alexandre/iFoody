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
    }
}
