using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessEntities;

namespace BusinessLayer.IServices
{
    public interface IProductService
    {
        ProductBusinessEntity GetProductById(Guid productId);
        IEnumerable<ProductBusinessEntity> GetAllProducts();
        Guid CreateProduct(ProductBusinessEntity productEntity);
        bool UpdateProduct(ProductBusinessEntity productEntity);
        bool DeleteProduct(Guid productId);
        IEnumerable<ImageBusinessEntity> GetAllImageByProductId(Guid productId);
    }
}
