using BusinessEntities;
using System;
using System.Collections.Generic;
using BusinessLayer.DTOs;

namespace BusinessLayer.IServices
{
    public interface IProductService
    {
        ProductBusinessEntity GetProductById(Guid productId);
        IEnumerable<ProductDto> GetAllProducts();
        Guid? CreateProduct(ProductBusinessEntity productEntity);
        bool UpdateProduct(ProductBusinessEntity productEntity);
        bool DeleteProduct(Guid productId);
        IEnumerable<ImageBusinessEntity> GetAllImageByProductId(Guid productId);
    }
}
