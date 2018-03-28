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
        IEnumerable<ImageBusinessEntity> GetImage(Guid id);

        // Get all Image in ProductImage Table - for testing
        IEnumerable<ProductImageBusinessEntity> GetAllProductImages();

        // Get all Image in StoreImage Table - for testing
        IEnumerable<StoreImageBusinessEntity> GetAllStoreImages();

        // Upload Image
        Task<List<FileUploadResult>> UploadImage(List<string> imagesEntity, string fileName, Guid? userId, Guid? storeId, Guid? productId);

        // Delete method
        bool DeleteImage(Guid id);

        // Update method
        bool UpdateImage(ImageBusinessEntity imageEntity);
    }
}
