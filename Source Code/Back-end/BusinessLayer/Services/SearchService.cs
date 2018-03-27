using AutoMapper;
using BusinessEntities;
using BusinessLayer.DTOs;
using BusinessLayer.IServices;
using DataModel;
using DataModel.IUnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
namespace BusinessLayer.Services
{
    public class SearchService:ISearchService
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
        public PagingReturnDto<ProductDto> SearchPaging(string searchString, int page, int? count)
        {
            try
            {
                var productsByProductName = _unitOfWork.Products.GetProductsByName(searchString).ToList();
                if (productsByProductName.Any())
                {
                    return _productService.ChangeProductsToPagingReturnDto(page, count, productsByProductName,true);
                }
                else
                {
                    var productsByStoreInfo = _unitOfWork.Products.SearchByStoreInfo(searchString).ToList();
                    if (productsByStoreInfo.Any())
                    {

                        return _productService.ChangeProductsToPagingReturnDto(page, count, productsByStoreInfo,true);
                    }
                    else
                    {
                        return null;
                    }
                }              
               
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public PagingReturnDto<ProductDto> TopRatingProducts(int? count)
        {
            try
            {
                var topProducts = _unitOfWork.Products.GetAll().OrderByDescending(x=>x.Rating).ToList();
                if (topProducts.Any())
                {
                    return _productService.ChangeProductsToPagingReturnDto(1, count, topProducts,true);
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
                    var products = _unitOfWork.Products.GetProductsByListId(favoriteList).ToList();
                    return _productService.ChangeProductsToPagingReturnDto(1, count, products, true);
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
        //public PagingReturnDto<ProductDto> FilterByLocation(string searchString, int page, int? count, 
        //                                                    double currentLatitude, double currentLongitude)
        public PagingReturnDto<ProductDto> FilterByLocation(string searchString, int page, int? count,
                                                            double currentLatitude, double currentLongitude)
        {
            try
            {
                var productsByProductName =
                    _unitOfWork.Products.GetProductsByName(searchString)
                        .GroupBy(x => x.StoreId)
                        .Select(x => x.FirstOrDefault());
                                           
                if (!productsByProductName.Any())
                {
                    productsByProductName = _unitOfWork.Products.SearchByStoreInfo(searchString).ToList();
                }
                List<Guid> listStoreId = new List<Guid>();
                foreach (var p in productsByProductName)
                {
                    listStoreId.Add(p.StoreId.GetValueOrDefault());
                }

                var storesSortByDistance = _locationService.FilterNearestLocations(currentLatitude, currentLongitude, listStoreId);
                Guid[] listStoreIdSort = new Guid[storesSortByDistance.Count];
                for(int i=0;i<storesSortByDistance.Count;i++)
                {
                    listStoreIdSort[i] = storesSortByDistance[i].location.StoreId.GetValueOrDefault();
                }
                var productsSortByDistance = productsByProductName.OrderBy(x =>
                {
                    return Array.IndexOf(listStoreIdSort, x.StoreId);
                }).ToList();
                return _productService.ChangeProductsToPagingReturnDto(1, count, productsSortByDistance, false);
            }
            catch (Exception e)
            {
                return null;
            }
        }

    }
}
