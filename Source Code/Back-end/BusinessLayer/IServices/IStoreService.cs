﻿using BusinessEntities;
using BusinessLayer.DTOs;
using System;
using System.Collections.Generic;

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

        // Get Store By User Id
        StoreBusinessEntity GetStoreByUserId(Guid userId);

        // Get Store's Address
        dynamic GetStoreAddress(List<Guid> ids);

        // User Open Store
        Guid? OpenStore(StoreDto storeEntity);

        // Update Store 
        bool UpdateStore(StoreBusinessEntity storeEntity);

        // Delete Store by Id
        bool DeleteStore(Guid? id);

        //// Encode Base 64 String
        //string Base64Encode(string plainText);

        //// Decode Base 64 String
        //string Base64Decode(string base64EncodedData);

        //// Get Base64 String For Image
        //string GetBase64StringForImage(string imagePath);

    }
}
