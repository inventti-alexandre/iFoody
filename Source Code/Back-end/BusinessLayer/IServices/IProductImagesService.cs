﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessEntities;

namespace BusinessLayer.IServices
{
    public interface IProductImagesService
    {
//        ProductImageBusinessEntity GetProductImagesById(Guid productId);
        IEnumerable<ProductImageBusinessEntity> GetAllProductImagesByProductId(Guid productId);
        Guid CreateProductImage(ProductImageBusinessEntity productEntity);    
        bool DeleteProductImage(Guid ImageId);
    }
}
