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
        private readonly int _defaultPageRecordCount;

        public SearchService(IUnitOfWork unitOfWork,IProductService productService, ILocationService locationService)
        {
            _unitOfWork = unitOfWork;
            _productService = productService;
            _locationService = locationService;
            _defaultPageRecordCount = 10;
        }

        #region Search
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
                        searchBusiness.Where(x => searchParam.categoriesListId.Any(y => y == x.store.CategoryId)).ToList();
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
                    PagingParam pagingParam = new PagingParam()
                    {
                        page = searchParam.page,
                        count = searchParam.count,
                        currentLatitude = searchParam.currentLatitude,
                        currentLongitude = searchParam.currentLongitude
                    };
                    result = PagingSearchResult(pagingParam, searchBusiness);
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
        public PagingReturnDto<SearchDto> TopRatingProducts(int? count)
        {
            try
            {
                List<Guid?> topProductsStoreId = _unitOfWork.Products.GetAll().OrderByDescending(x => x.Rating)
                                                .Select(x=>x.StoreId).ToList();
                List<Guid> storeIds=new List<Guid>();
                foreach (var id in topProductsStoreId)
                {
                    storeIds.Add(id.GetValueOrDefault());
                }
                var topStore = _unitOfWork.Products.GetStoreReturnByListId(storeIds);
                if (topStore.Any())
                {
                    PagingParam pagingParam = new PagingParam()
                    {
                        page = 1,
                        count = count??_defaultPageRecordCount,
                        currentLatitude = 0,
                        currentLongitude = 0
                    };
                    return PagingSearchResult(pagingParam,topStore);
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
        public PagingReturnDto<SearchDto> SuggestionListByUserId(Guid userId, int? count)
        {
            try
            {
                var favoriteList = _unitOfWork.FavoriteLists.GetManyQueryable(x => x.UserId == userId);
                if (favoriteList.Any())
                {
                    List<Guid> storeIds = new List<Guid>();
                    foreach (var f in favoriteList)
                    {
                        Guid ?productId = f.ProductId;
                        Guid ?storeId = f.StoreId;
                        if (productId != null)
                        {
                            Guid? storeIdOfProduct =
                            _unitOfWork.Products.GetById(productId).StoreId;
                            if (storeIdOfProduct != null)
                            {
                                storeIds.Add(storeIdOfProduct.Value);
                            }                           
                        }
                        if (storeId != null)
                        {
                            storeIds.Add(storeId.Value);
                        }
                    }
                    storeIds = storeIds.Distinct().ToList();
                    var topStore = _unitOfWork.Products.GetStoreReturnByListId(storeIds);
                    PagingParam pagingParam = new PagingParam()
                    {
                        page = 1,
                        count = count ?? _defaultPageRecordCount,
                        currentLatitude = 0,
                        currentLongitude = 0
                    };
                    return PagingSearchResult(pagingParam, topStore);

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
        #region Private
        
        private class PagingParam
        {
            public int page { get; set; }
            public int count { get; set; }
            public double currentLatitude { get; set; }
            public double currentLongitude { get; set; }
        }
        private PagingReturnDto<SearchDto> PagingSearchResult(PagingParam searchParam, List<SearchReturn> allResults)
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
                    Results = MapToSearchDto(searchParam.currentLatitude,searchParam.currentLongitude,page)
                };
                return pageDto;
            }
            else
            {
                return null;
            }

        }
        private IEnumerable<SearchDto> MapToSearchDto(double currentLatitude,double currentLongitude, List<SearchReturn> page)
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
                    Distance = (currentLatitude!=0 && currentLongitude!=0)?
                    _locationService.CalcStoreDistance(currentLatitude, currentLongitude, item.store.Id):0
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
                .Where(x => districts.Any(d=>d.ToLower()==x.District.ToLower())).Select(x => x.Id).ToList();
            searchBusiness = searchBusiness.Where(x => storesFilterId.Contains(x.store.Id)).ToList();
            return searchBusiness;
        }

        #endregion
    }
}
