using BusinessLayer.DTOs;
using BusinessLayer.IServices;
using DataModel.IUnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BusinessLayer.Services
{
    public class SearchService : ISearchService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IProductService _productService;

        public SearchService(IUnitOfWork unitOfWork, IProductService productService)
        {
            _unitOfWork = unitOfWork;
            _productService = productService;
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
                    return _productService.ChangeProductsToPagingReturnDto(page, count, productsByProductName, true);
                }
                else
                {
                    var productsByStoreInfo = _unitOfWork.Products.SearchByStoreInfo(searchString).ToList();
                    if (productsByStoreInfo.Any())
                    {

                        return _productService.ChangeProductsToPagingReturnDto(page, count, productsByStoreInfo, true);
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
                var topProducts = _unitOfWork.Products.GetAll().OrderByDescending(x => x.Rating).ToList();
                if (topProducts.Any())
                {
                    return _productService.ChangeProductsToPagingReturnDto(1, count, topProducts, true);
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
    }
}
