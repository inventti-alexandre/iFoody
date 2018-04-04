using BusinessLayer.DTOs;
using BusinessLayer.IServices;
using DataModel.IUnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using BusinessEntities;
using DataModel;
using DataModel.Repository;

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

        #region Suggestion return productDto
        public PagingReturnDto<ProductDto> TopRatingProducts(int? count)
        {
            try
            {
                var topProducts = _unitOfWork.Products.GetProductInfo().OrderByDescending(x => x.product.Rating).ToList();
                if (topProducts.Any())
                {
                    return _productService.PagingProductDto(1, count, topProducts);
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
                var favoriteList = _unitOfWork.FavoriteLists.GetManyQueryable(x => x.UserId == userId);
                if (favoriteList.Any())
                {
                    List<Guid> listProductIds = new List<Guid>();
                    foreach (var f in favoriteList)
                    {
                        Guid id = f.ProductId.GetValueOrDefault();
                        listProductIds.Add(id);
                    }
                    var products = _unitOfWork.Products.GetProductsInfoByListId(listProductIds)
                        .OrderByDescending(x => x.product.Rating).ToList();
                    return _productService.PagingProductDto(1, count, products);
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
       
        #endregion
        #region Search return searchDto
        public PagingReturnDto<SearchDto> SearchDto_Search(SearchParam searchParam)
        {
            try
            {
                PagingReturnDto<SearchDto> result = new PagingReturnDto<SearchDto>();
                var searchBusiness = _unitOfWork.Products.Search(searchParam.searchString);
                //filter
                if (searchParam.filterOption.categories)
                {
                    searchBusiness =
                        searchBusiness.Where(x => searchParam.categoriesListId.Any(y=>y==x.store.CategoryId)).ToList();
                }
                if (searchParam.filterOption.districts)
                {
                    searchBusiness = FiterByDistricts(searchBusiness, searchParam.districtList);
                }              
                if (searchParam.filterOption.location)
                {
                    searchBusiness = FiterByLocation(searchBusiness, searchParam.currentLatitude, searchParam.currentLongitude);
                }
                if (searchParam.filterOption.rating)
                {
                    searchBusiness = searchBusiness.OrderByDescending(x => x.store.Rating).ToList();
                }
                if (searchBusiness != null)
                {
                    result = PagingSearchResult(searchParam, searchBusiness);
                }
                else
                {
                    result = null;
                }
               
              return result;
            }
            catch (Exception e)
            {
                return null;
            }
        }
        private PagingReturnDto<SearchDto> PagingSearchResult(SearchParam searchParam, List<SearchReturn> allResults)
        {
            int takePage = searchParam.page;
            int takeCount = searchParam.count;
            int totalProducts = allResults.Count();
            var page = new List<SearchReturn>();
            page = allResults
                    .Skip((takePage - 1) * takeCount)
                    .Take(takeCount)
                    .ToList();
            // Map to DTO
            if (page.Any())
            {
                double tempTotalPage = (double)totalProducts / (double)takeCount;
                var pageDto = new PagingReturnDto<SearchDto>()
                {
                    currentPage = takePage,
                    totalRecord = totalProducts,
                    totalPage = Convert.ToInt32(Math.Ceiling(tempTotalPage)),
                    Results = MapToSearchDto(searchParam,page)
                };
                return pageDto;
            }
            else
            {
                return null;
            }

        }
        private IEnumerable<SearchDto> MapToSearchDto(SearchParam searchParam,List<SearchReturn> page)
        {
            Mapper.CreateMap<Store, StoreBusinessEntity>();
            Mapper.CreateMap<Category, CategoryBusinessEntity>();
            Mapper.CreateMap<Image, ImageBusinessEntity>();
            Mapper.CreateMap<Location, LocationBusinessEntity>();
            List<SearchDto> pageDto = new List<SearchDto>();
            foreach (var item in page)
            {
                SearchDto mapItem = new SearchDto()
                {
                    Store = Mapper.Map<Store, StoreBusinessEntity>(item.store),
                    Category = Mapper.Map<Category, CategoryBusinessEntity>(item.category),
                    Images = Mapper.Map<List<Image>, List<ImageBusinessEntity>>(item.images),
                    Distance = _locationService.CalcStoreDistance(searchParam.currentLatitude, 
                                                                    searchParam.currentLongitude, item.store.Id)
                };
               pageDto.Add(mapItem);
            }
            return pageDto;
        }
        private List<SearchReturn> FiterByLocation(List<SearchReturn> searchBusiness,
                                                    double currentLatitude, double currentLongitude)
        {
            List<Guid> listStoreId = new List<Guid>();
            foreach (var p in searchBusiness)
            {
                listStoreId.Add(p.store.Id);
            }
            var storesSortByDistance = _locationService.FilterNearestLocations
                                        (currentLatitude, currentLongitude, listStoreId);
            Guid[] listStoreIdSort = new Guid[storesSortByDistance.Count];

            for (int i = 0; i < storesSortByDistance.Count; i++)
            {
                listStoreIdSort[i] = storesSortByDistance[i].location.StoreId.GetValueOrDefault();
            }
            var productsSortByDistance = searchBusiness.OrderBy(x =>
            {
                return Array.IndexOf(listStoreIdSort, x.store.Id);
            }).ToList();
            return productsSortByDistance;
        }
        private List<SearchReturn> FiterByDistricts(List<SearchReturn> searchBusiness, List<string> districts)
        {
            List<Guid> listStoreId = new List<Guid>();
            foreach (var p in searchBusiness)
            {
                listStoreId.Add(p.store.Id);
            }
            List<Guid> storesFilterId = _unitOfWork.Stores.GetManyQueryable(x => listStoreId.Contains(x.Id))
                .Where(x => districts.Contains(x.District)).Select(x => x.Id).ToList();
            searchBusiness = searchBusiness.Where(x => storesFilterId.Contains(x.store.Id)).ToList();
            return searchBusiness;
        }

        #endregion

    }
}
