using BusinessEntities;
using BusinessLayer.DTOs;
using System;
using System.Collections.Generic;
using DataModel;

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
        ProductDto ConvertProductToProductDto(Product product);
        IEnumerable<ProductDto> ChangeProductsToProductDto(List<Product> products);
        PagingReturnDto<ProductDto> ChangeProductsToPagingReturnDto(int page, int? count, List<Product> allProducts);
    }
}
