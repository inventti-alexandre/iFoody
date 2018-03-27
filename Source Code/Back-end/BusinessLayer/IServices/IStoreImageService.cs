using BusinessEntities;
using System;

namespace BusinessLayer.IServices
{
    public interface IStoreImageService
    {
        Guid CreateStoreImage(StoreImageBusinessEntity storeImageEntity);
    }
}
