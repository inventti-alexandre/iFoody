using BusinessLayer.DTOs;
using BusinessLayer.IServices;
using DataModel.IUnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using BusinessEntities;
using DataModel;

namespace BusinessLayer.Services
{
    public class SearchService : ISearchService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IProductService _productService;
        private readonly ILocationService _locationService;
       
        public SearchService(IUnitOfWork unitOfWork,IProductService productService, ILocationService locationService)
        {
            _unitOfWork = unitOfWork;
            _productService = productService;
            _locationService = locationService;
        }

        public IEnumerable<ProductDto> SearchByProductName(string productName)
        {

            try
            {
                // Get All Products Entity List
                var products = _unitOfWork.Products.GetProductsByName(productName).ToList();
                if (products.Any())
                {
                    return _productService.ChangeProductsToProductDto(products);
                }
                else
                {
                    return null;
                }
            }
            catch (Exception e)
            {
                return null;
            }

        }
        public IEnumerable<ProductDto> SearchByStoreInfo(string searchString)
        {
            try
            {
                // Get All Products Entity List
                var products = _unitOfWork.Products.SearchByStoreInfo(searchString).ToList();
                if (products.Any())
                {
                    return _productService.ChangeProductsToProductDto(products);
                }
                else
                {
                    return null;
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public IEnumerable<ProductDto> SearchByCategoryName(string categoryName)
        {
            try
            {
                // Get All Products Entity List
                var products = _unitOfWork.Products.SearchByCategoryName(categoryName).ToList();
                if (products.Any())
                {
                    return _productService.ChangeProductsToProductDto(products);
                }
                else
                {
                    return null;
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }
        //Search Paging
        public PagingReturnDto<ProductDto> TopRatingProducts(int? count)
        {
            try
            {
                var topProducts = _unitOfWork.Products.GetAll().OrderByDescending(x => x.Rating).ToList();
                if (topProducts.Any())
                {
                    return _productService.ChangeProductsToPagingReturnDto(1, count, topProducts);
                }
                else
                {
                    return null;
                }

            }
            catch (Exception e)
            {
                return null;
            }
        }

        public PagingReturnDto<ProductDto> SuggestionListByUserId(Guid userId, int? count)
        {
            try
            {
                List<Guid?> favoriteList = _unitOfWork.FavoriteLists.GetManyQueryable(x => x.UserId == userId).Select(x => x.ProductId).ToList();
                if (favoriteList.Any())
                {
                    var products = _unitOfWork.Products.GetProductsByListId(favoriteList)
                        .OrderByDescending(x => x.Rating).ToList();
                    return _productService.ChangeProductsToPagingReturnDto(1, count, products);
                }
                else
                {
                    return null;
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        //Filter 
        public PagingReturnDto<ProductDto> Searching(SearchParam searchParam)
        {
            try
            {
                //search without filter              
                var products =
                    _unitOfWork.Products.GetProductsByName(searchParam.searchString);

                if (!products.Any())
                {
                    products = _unitOfWork.Products.SearchByStoreInfo(searchParam.searchString);
                }
                //filter

                if (searchParam.filterOption.categories)
                {
                    products =
                        products.Where(x => searchParam.categoriesListId.Contains(x.CategoryId.GetValueOrDefault()));
                }
                if (searchParam.filterOption.districts)
                {
                    products = FiterByDistricts(products, searchParam.districtList);
                }
                if (searchParam.filterOption.rating)
                {
                    products = products.OrderByDescending(x => x.Rating);
                }
                if (searchParam.filterOption.location)
                {                  
                    products = FiterByLocation(products, searchParam.currentLatitude, searchParam.currentLongitude);
                }
                //conver to DTO
                var results = _productService.ChangeProductsToPagingReturnDto(searchParam.page, searchParam.count, products.ToList());
                return results;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        #region Fiter method
        public IEnumerable<Product> FiterByLocation(IEnumerable<Product> products,
                                                    double currentLatitude, double currentLongitude)
        {
            List<Guid> listStoreId = new List<Guid>();
            foreach (var p in products)
            {
                listStoreId.Add(p.StoreId.GetValueOrDefault());
            }
            var storesSortByDistance = _locationService.FilterNearestLocations
                                        (currentLatitude, currentLongitude, listStoreId);
            Guid[] listStoreIdSort = new Guid[storesSortByDistance.Count];

            for (int i = 0; i < storesSortByDistance.Count; i++)
            {
                listStoreIdSort[i] = storesSortByDistance[i].location.StoreId.GetValueOrDefault();
            }
            var productsSortByDistance = products.OrderBy(x =>
            {
                return Array.IndexOf(listStoreIdSort, x.StoreId);
            });
            return productsSortByDistance;
        }

        public IEnumerable<Product> FiterByDistricts(IEnumerable<Product> products, List<string> districts)
        {
            List<Guid> listStoreId = new List<Guid>();
            foreach (var p in products)
            {
                listStoreId.Add(p.StoreId.GetValueOrDefault());
            }
            List<Guid> storesFilterId = _unitOfWork.Stores.GetManyQueryable(x => listStoreId.Contains(x.Id))
                .Where(x => districts.Contains(x.District)).Select(x => x.Id).ToList();
            products = products.Where(x => storesFilterId.Contains(x.StoreId.GetValueOrDefault()));
            return products;
        }
        #endregion

    }
}
