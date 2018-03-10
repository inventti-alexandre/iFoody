﻿using AutoMapper;
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
        public SearchService(IUnitOfWork unitOfWork,IProductService productService)
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
                    return _productService.ChangeProductsToPagingReturnDto(page, count, productsByProductName);
                }
                else
                {
                    var productsByStoreInfo = _unitOfWork.Products.SearchByStoreInfo(searchString).ToList();
                    if (productsByStoreInfo.Any())
                    {

                        return _productService.ChangeProductsToPagingReturnDto(page, count, productsByStoreInfo);
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
    }
}
