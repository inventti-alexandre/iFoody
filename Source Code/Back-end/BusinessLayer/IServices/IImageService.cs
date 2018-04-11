using BusinessEntities;
using BusinessLayer.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLayer.IServices
{
    public interface IImageService
    {

        // Get All Image
        List<ImageBusinessEntity> GetAll();

        // Get Image by Id
        ImageBusinessEntity Get(Guid id);

        // Get Images by Id
        IEnumerable<ImageBusinessEntity> GetImage(Guid id);

        // Get Image By StoreId
        IEnumerable<ImageBusinessEntity> GetImageByStoreId(Guid storeId);

        // Get all Image in ProductImage Table - for testing
        IEnumerable<ProductImageBusinessEntity> GetAllProductImages();

        // Get all Image in StoreImage Table - for testing
        IEnumerable<StoreImageBusinessEntity> GetAllStoreImages();

        // Get All Images Id By Product Id 
        IEnumerable<Guid> GetImageIdsByProductId(Guid productId);

        // Get All Images Id By Store Id 
        IEnumerable<Guid> GetImageIdsByStoreId(Guid storeId);

        // Upload Image
        Task<List<FileUploadResult>> UploadImage(List<string> imagesEntity, string fileName, Guid? userId, Guid? storeId, Guid? productId);

        // Delete Store Image
        bool DeleteStoreImage(Guid id);

        // Delete Product Image
        bool DeleteProductImage(Guid id);

        // Update method
        bool UpdateImage(ImageBusinessEntity imageEntity);
    }
}
