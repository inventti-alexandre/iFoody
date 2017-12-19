using BusinessEntities;
using System;
using System.Collections.Generic;
using BusinessLayer.DTOs;

namespace BusinessLayer.IServices
{
    public interface IStoreService
    {
        // Get All Store
        IEnumerable<StoreBusinessEntity> GetAllStore();

        // Get Many Store by List Id
        IEnumerable<StoreBusinessEntity> GetManyStore(List<Guid> ids);
        // Get One Store By Id
        StoreDto GetStoreById(Guid? id);

        // User Open Store
        Guid? OpenStore(StoreBusinessEntity storeEntity);
        StoreBusinessEntity GetStoreByUserId(Guid userId);

        // Update Store 
        bool UpdateStore(StoreBusinessEntity storeEntity);

        // Delete Store by Id
        bool DeleteStore(Guid? id);
    }
}
