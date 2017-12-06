﻿using BusinessEntities;
using BusinessLayer.DTOs;
using System;
using System.Collections.Generic;

namespace BusinessLayer.IServices
{
    public interface IProductService
    {
        ProductDto GetProductById(Guid productId);
        IEnumerable<ProductDto> GetAllProducts();
        Guid? CreateProduct(ProductBusinessEntity productEntity);
        bool UpdateProduct(ProductBusinessEntity productEntity);
        bool DeleteProduct(Guid productId);
        IEnumerable<ProductDto> GetProductsByCategory(Guid categoryId);
        IEnumerable<ImageBusinessEntity> GetAllImageByProductId(Guid productId);
        PagingReturnDto<ProductDto> PagingAllProducts(int page, int? count);
        PagingReturnDto<ProductDto> PagingAllProductsByCategory(Guid categoryId,int page, int? count);
    }
}
