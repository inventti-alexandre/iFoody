using DataModel.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DataModel.Repository
{
    public class SearchReturn
    {
        public Store store { get; set; }
        public Category category { get; set; }
        public List<Image> images { get; set; }
    }

    public class ProductReturn
    {
        public Product product { get; set; }
        public Store store { get; set; }
        public Category category { get; set; }
        public List<Image> images { get; set; }
    }
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        private iFoodyEntities _iFoodyContext;

        public ProductRepository(iFoodyEntities iFoodyEntities) : base(iFoodyEntities)
        {
            this._iFoodyContext = iFoodyEntities;
        }

        public List<ProductReturn> GetProductsInfoByListId(List<Guid> listProductsId)
        {
            if (listProductsId.Any())
            {
                List<ProductReturn> result = new List<ProductReturn>();
                foreach (var productId in listProductsId)
                {
                    ProductReturn item = CreateProductItemReturn(productId);
                    result.Add(item);
                }
                return result;

            }
            else
            {
                return null;
            }
        }

        public List<ProductReturn> GetProductInfo()
        {
            List<ProductReturn> result = new List<ProductReturn>();
            List<Guid> listAllProductId = _iFoodyContext.Products.Select(x => x.Id).ToList();
            if (listAllProductId.Any())
            {
                foreach (var productId in listAllProductId)
                {
                    ProductReturn item = CreateProductItemReturn(productId);
                    result.Add(item);
                }
            }
            else
            {
                result = null;
            }
          
            return result;
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

        #region Return Store
        public List<SearchReturn> Search(string input)
        {
            List<SearchReturn> result = new List<SearchReturn>();
            string searchString = SplitWords(input);
            //by product
            string sql1 = "select StoreId from Products where CONTAINS(Name,'" + searchString + "')";
            IEnumerable<Guid> storeId_byProduct = _iFoodyContext.Database.SqlQuery<Guid>(sql1);
            //by store
            string sql2 = "select Id from StoreSearch where CONTAINS(SearchString,'" + searchString + "')";
            IEnumerable<Guid> storeId_byStore = _iFoodyContext.Database.SqlQuery<Guid>(sql2);
            //by categories
            IEnumerable<Guid> listCategoriesId = _iFoodyContext.Categories.Where(x => x.Name.Contains(input))
                                                                          .Select(x => x.Id);
            IEnumerable<Guid> storeId_byCategories = new List<Guid>();
            if (listCategoriesId.Any())
            {
                storeId_byCategories =
                    _iFoodyContext.Stores.Where(x => listCategoriesId.Any(y => y == x.Id)).Select(x => x.Id);
            }           
            //plus
            List<Guid> storeIds = new List<Guid>();
            if (storeId_byProduct.Any())
            {
                storeIds.AddRange(storeId_byProduct);
            }
            if (storeId_byStore.Any())
            {
                storeIds.AddRange(storeId_byStore);
            }
            if (storeId_byCategories.Any())
            {
                storeIds.AddRange(storeId_byCategories);
            }
            storeIds = storeIds.Distinct().ToList();
            if (storeIds.Any())
            {
                foreach (var storeId in storeIds)
                {
                    SearchReturn item = CreateSearchItemReturn(storeId);
                    result.Add(item);
                }
            }
            else
            {
                result = null;
            }
            return result;
        }       
        #endregion

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
        private SearchReturn CreateSearchItemReturn(Guid storeId)
        {
            SearchReturn item = new SearchReturn()
            {
                store = null,
                category = null,
                images = null
            };
            item.store = _iFoodyContext.Stores.Where(x => x.Id == storeId).FirstOrDefault();
            item.category = _iFoodyContext.Categories.Where(x => x.Id == item.store.CategoryId).FirstOrDefault();
            IEnumerable<Guid> listImagesId =
                _iFoodyContext.StoreImages.Where(x => x.StoreId == storeId).Select(x => x.ImageId);
            item.images = _iFoodyContext.Images.Where(x => listImagesId.Contains(x.Id)).ToList();
            return item;
        }
        private ProductReturn CreateProductItemReturn(Guid productId)
        {
            ProductReturn item = new ProductReturn()
            {
                product = null,
                store = null,
                category = null,
                images = null
            };
            item.product = _iFoodyContext.Products.Where(x => x.Id == productId).FirstOrDefault();
            item.store = _iFoodyContext.Stores.Where(x => x.Id == item.product.StoreId).FirstOrDefault();
            item.category = _iFoodyContext.Categories.Where(x => x.Id == item.product.CategoryId).FirstOrDefault();
            IEnumerable<Guid> listImagesId =
                _iFoodyContext.ProductImages.Where(x => x.ProductId == productId).Select(x => x.ImageId);
            item.images = _iFoodyContext.Images.Where(x => listImagesId.Contains(x.Id)).ToList();
            return item;
        }
        #endregion


    }
}
