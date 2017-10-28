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
        void CreateProduct(ProductBusinessEntity productEntity);
        void UpdateProduct(Guid productId, ProductBusinessEntity productEntity);
        void DeleteProduct(Guid productId);
    }
}
