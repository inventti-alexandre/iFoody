using BusinessEntities;
using System;
using System.Collections.Generic;

namespace BusinessLayer.IServices
{
    public interface ILocationService
    {
        // Get Location Business Entity from StoreId List
        IEnumerable<LocationBusinessEntity> GetLocationFromStoreIds(List<Guid> ids);

        // Insert Store's Location to DB
        bool InsertLocation(LocationBusinessEntity locationEnity);

        // Find Nearest Locations from input List Locations. Use decimal because Location in Database which is stored in decimal(9,6) - presice for location in maps
        dynamic FindNearestLocations(double currentLatitude, double currentLongitude, List<Guid> storeIds);

        // Convert Address to Location
        dynamic GetLocationFromAddress(string input);

        // Get All Locations
        IEnumerable<LocationBusinessEntity> GetAllLocations();
    }
}
