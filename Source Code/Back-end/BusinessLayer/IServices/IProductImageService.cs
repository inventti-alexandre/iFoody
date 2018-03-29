using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessEntities;

namespace BusinessLayer.IServices
{
    public interface IProductImageService
    {
        ProductImageBusinessEntity GetProductImageById(Guid id);
        IEnumerable<ProductImageBusinessEntity> GetAllProductImagesByProductId(Guid productId);
        Guid CreateProductImage(ProductImageBusinessEntity productEntity);    
        bool DeleteProductImage(Guid ImageId);
    }
}
