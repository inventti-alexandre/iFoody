using BusinessEntities;
using BusinessLayer.DTOs;
using DataModel;
using System;
using System.Collections.Generic;

namespace BusinessLayer.IServices
{
    public interface IProductService
    {
        IEnumerable<ProductDto> GetAllProducts();
        IEnumerable<ProductBusinessEntity> GetAllProductsWithoutDto();
        ProductDto GetProductById(Guid productId);
        IEnumerable<ProductDto> GetProductsByCategory(Guid categoryId);
        IEnumerable<ProductInStoreDto> GetProductByStoreId(Guid storeId);
        Guid? CreateProduct(UploadProductDto uploadProductDto);
        bool UpdateProduct(UploadProductDto uploadProductDto);
        bool UpdateRatingProperty(Guid productId, int newRating);
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
