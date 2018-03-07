using BusinessEntities;
using BusinessLayer.DTOs;
using System;
using System.Collections.Generic;

namespace BusinessLayer.IServices
{
    public interface IProductService
    {
        IEnumerable<ProductDto> GetAllProducts();
        ProductDto GetProductById(Guid productId);
        IEnumerable<ProductDto> GetProductsByCategory(Guid categoryId);
        Guid? CreateProduct(ProductBusinessEntity productEntity);
        bool UpdateProduct(ProductBusinessEntity productEntity);
        bool DeleteProduct(Guid productId);
        IEnumerable<ProductDto> GetProductByCategoryId(Guid categoryId);
        IEnumerable<ImageBusinessEntity> GetAllImageByProductId(Guid productId);
        PagingReturnDto<ProductDto> PagingAllProducts(int page, int? count);
        PagingReturnDto<ProductDto> PagingAllProductsByCategory(Guid categoryId, int page, int? count);
        //search
        IEnumerable<ProductDto> GetProductByName(string name);
    }
}
