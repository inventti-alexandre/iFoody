using BusinessEntities;
using BusinessLayer.DTOs;
using DataModel.Repository;
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
        IEnumerable<Guid> GetProductIdsByStoreId(Guid storeId);
        Guid? CreateProduct(UploadProductDto uploadProductDto);
        bool UpdateProduct(UploadProductDto uploadProductDto);
        bool UpdateRatingProperty(Guid productId, int newRating);
        bool DeleteProduct(Guid productId);
        IEnumerable<ProductDto> GetProductByCategoryId(Guid categoryId);
        IEnumerable<ImageBusinessEntity> GetAllImageByProductId(Guid productId);
        PagingReturnDto<ProductDto> PagingAllProducts(int page, int? count);
        PagingReturnDto<ProductDto> PagingAllProductsByCategory(Guid categoryId, int page, int? count);
        PagingReturnDto<ProductDto> PagingProductDto(int pageIndex, int? count, List<ProductReturn> allProducts);
        PagingReturnDto<ProductDto> GetSimilarProducts(Guid productId, int page, int? count);
        IEnumerable<ProductDto> MapToProductDto(List<ProductReturn> page);
    }
}
