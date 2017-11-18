using BusinessEntities;
using System;
using System.Collections.Generic;

namespace BusinessLayer.IServices
{
    public interface IImageService
    {

        // Get All Image
        List<ImageBusinessEntity> GetAll();

        // Get Image by Id
        IEnumerable<ImageBusinessEntity> GetImage(Guid id);

        // Upload Image
        bool UploadImage(List<ImageBusinessEntity> imagesEntity, Guid? userId, Guid? storeId);

        // Delete method
        bool DeleteImage(Guid id);

        // Update method
        bool UpdateImage(ImageBusinessEntity imageEntity);
    }
}
