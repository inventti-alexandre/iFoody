using DataModel.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;

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
            string searchString = SplitWords(name);
            string sql = "select * from Products where CONTAINS(Name,'" + searchString + "')";
            var products = _iFoodyContext.Database.SqlQuery<Product>(sql).AsQueryable();
            if (products.Any())
            {
                var productsFilter = products.GroupBy(x => x.StoreId).Select(x => x.FirstOrDefault())
                    .AsQueryable();
                return productsFilter;
            }
            else
            {
                return null;
            }
        }

        //Search by category name
        public IEnumerable<Product> SearchByCategoryName(string categoryName)
        {
            IEnumerable<Guid> listCategoriesId = _iFoodyContext.Categories.Where(x => x.Name.Contains(categoryName))
                                                                          .Select(x => x.Id);
            if (listCategoriesId.Any())
            {
                var products =
                    _iFoodyContext.Products.Where(x => listCategoriesId.Contains(x.Category.Id)).AsQueryable();
                var productsFilter = products.GroupBy(x => x.Store.Id).Select(x => x.FirstOrDefault())
                                            .AsQueryable();
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
            string searchStringSplit = SplitWords(searchString);
            string sql = "select Id from StoreSearch where CONTAINS(SearchString,'" + searchStringSplit + "')";
            IEnumerable<Guid> listId = _iFoodyContext.Database.SqlQuery<Guid>(sql);
            if (listId.Any())
            {
                var products = _iFoodyContext.Products.Where(x => listId.Contains(x.Store.Id)).AsQueryable();
                var productsFilter = products.GroupBy(x => x.Store.Id).Select(x => x.FirstOrDefault())
                                            .AsQueryable();
                return productsFilter;
            }
            else
            {
                return null;
            }
        }

        #region private implement
        private string SplitWords(string name)
        {
            string[] words = name.Split(' ');
            string searchString = "";
            for (int i = 0; i < words.Length; i++)
            {
                if (i == words.Length - 1)
                {
                    searchString = searchString + "\"*" + words[i] + "*\" ";
                }
                else
                {
                    searchString = searchString + "\"*" + words[i] + "*\" " + "AND ";
                }
            }
            return searchString;
        }
        #endregion


    }
}
