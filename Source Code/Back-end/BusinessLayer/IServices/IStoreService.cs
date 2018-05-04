using BusinessEntities;
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

        // Get Stores By District
        IEnumerable<StoreBusinessEntity> GetStoreByDistrict(string city, string district);

        // Get Stores By Name
        IEnumerable<StoreBusinessEntity> GetStoreByName(string name);

        // Get Store By User Id
        StoreBusinessEntity GetStoreByUserId(Guid userId);

        // Get Store By Category Id
        IEnumerable<StoreBusinessEntity> GetStoreByCategoryId(Guid id);

        // Get Store's Address
        dynamic GetStoreAddress(List<Guid> ids);

        // User Open Store
        Guid? OpenStore(OpenStoreDto openStoreDto);

        // Update Store 
        bool UpdateStore(OpenStoreDto openStoreDto);

        // Update RatingCount Property
        bool UpdateRatingProperty(Guid storeId, int newRating);

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
