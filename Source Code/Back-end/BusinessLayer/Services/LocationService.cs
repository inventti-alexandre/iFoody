using AutoMapper;
using BusinessEntities;
using BusinessLayer.IServices;
using DataModel;
using DataModel.IUnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Transactions;
using System.Xml.Linq;
using BusinessLayer.DTOs;

namespace BusinessLayer.Services
{
    public class LocationService : ILocationService
    {
        private readonly IUnitOfWork _unitOfWork;

        // Constructor
        public LocationService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // Get Location Business Entity from StoreId List
        public IEnumerable<LocationBusinessEntity> GetLocationFromStoreIds(List<Guid> ids)
        {
            try
            {
                using (var scope = new TransactionScope())
                {
                    var locations = _unitOfWork.Locations.GetManyQueryable(i => ids.Any(x => x.Equals(i.StoreId))).ToList();
                    if (!locations.Any())
                    {
                        return null;
                    }

                    Mapper.CreateMap<Location, LocationBusinessEntity>();
                    var locationBusinessEntities = Mapper.Map<List<Location>, List<LocationBusinessEntity>>(locations);
                    return locationBusinessEntities;
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // Insert Store's Location to DB
        public bool InsertLocation(LocationBusinessEntity locationEnity)
        {
            try
            {
                // Check Exist user
                if (locationEnity == null)
                {
                    return false;
                }
                using (var scope = new TransactionScope())
                {
                    Mapper.CreateMap<LocationBusinessEntity, Location>().ForMember(x => x.Id, opt => opt.Ignore());
                    var location = Mapper.Map<LocationBusinessEntity, Location>(locationEnity);

                    _unitOfWork.Locations.Insert(location);

                    _unitOfWork.Complete();
                    scope.Complete();

                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }

        // Find Nearest Locations from input List Locations. Use decimal because Location in Database which is stored in decimal(9,6) - presice for location in maps
        public dynamic FindNearestLocations(double currentLatitude, double currentLongitude, List<Guid> storeIds)
        {
            try
            {
                if (storeIds.Any())
                {
                    var locationsList = this.GetLocationFromStoreIds(storeIds).ToList();
                    var nearestLocations = new List<object>();

                    // Using 'for' is better in performance than 'foreach' to List
                    for (var i = 0; i < locationsList.Count(); i++)
                    {
                        var latitude = (double)locationsList[i].Latitude;
                        var longitude = (double)locationsList[i].Longitude;

                        double distance = LocationService.HaversineDistance(currentLatitude, currentLongitude, latitude, longitude);

                        var locationObject = new
                        {
                            LocationBusinessEntity = locationsList[i],
                            Distance = distance
                        };

                        nearestLocations.Add(locationObject);
                    }
                    var resultList =
                        nearestLocations.OrderBy(
                                x => x.GetType().GetProperty("Distance").GetValue(x, null))
                            .Select(e => e.GetType().GetProperty("LocationBusinessEntity").GetValue(e, null))
                            .ToList()
                            ;
                    ;
                    return resultList;
                }
                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }
        //PHUONG test
        public List<LocationWithDistanceDto> FilterNearestLocations(double currentLatitude, double currentLongitude, List<Guid> storeIds)
        {
            try
            {
                if (storeIds.Any())
                {
                    var locationsList = this.GetLocationFromStoreIds(storeIds).ToList();
                    var nearestLocations = new List<LocationWithDistanceDto>();

                    // Using 'for' is better in performance than 'foreach' to List
                    for (var i = 0; i < locationsList.Count(); i++)
                    {
                        var latitude = (double)locationsList[i].Latitude;
                        var longitude = (double)locationsList[i].Longitude;

                        double distance = LocationService.HaversineDistance(currentLatitude, currentLongitude, latitude, longitude);

                        var locationObject = new LocationWithDistanceDto()
                        {
                            location = locationsList[i],
                            Distance = distance
                        };

                        nearestLocations.Add(locationObject);
                    }
                    var resultList = nearestLocations.OrderBy(x => x.Distance).ToList();
                    return resultList;
                }
                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }


        // Haversine Formula to calculate distance between two points. Use double type for better calculation
        public static double HaversineDistance(double lat1, double lng1, double lat2, double lng2, char unit = 'K')
        {
            try
            {
                double rlat1 = Math.PI * lat1 / 180;
                double rlat2 = Math.PI * lat2 / 180;
                double theta = lng1 - lng2;
                double rtheta = Math.PI * theta / 180;
                double dist =
                    Math.Sin(rlat1) * Math.Sin(rlat2) + Math.Cos(rlat1) *
                    Math.Cos(rlat2) * Math.Cos(rtheta);
                dist = Math.Acos(dist);
                dist = dist * 180 / Math.PI;
                dist = dist * 60 * 1.1515;

                //switch (unit)
                //{
                //    case 'K': //Kilometers -> default
                //        return dist * 1.609344;
                //    case 'N': //Nautical Miles 
                //        return dist * 0.8684;
                //    case 'M': //Miles
                //        return dist;
                //}

                return dist * 1.609344;
            }
            catch (Exception e)
            {
                return 9999;
            }
        }

        // Convert Geographic and Address with GeoCoder Google Maps API - Using when Open Store in UserController
        public dynamic GetLocationFromAddress(string input)
        {
            try
            {
                var address = input;
                string requestUri = string.Format("http://maps.googleapis.com/maps/api/geocode/xml?address={0}&sensor=false&AIzaSyCiY8keBM8gppqsXkyKyyLxTwo31sFRjC0", Uri.EscapeDataString(address));

                WebRequest request = WebRequest.Create(requestUri);
                WebResponse response = request.GetResponse();
                XDocument xdoc = XDocument.Load(response.GetResponseStream());

                var xElement = xdoc.Element("GeocodeResponse");
                if (xElement != null)
                {
                    XElement result = xElement.Element("result");
                    XElement locationElement = result.Element("geometry").Element("location");
                    XElement lat = locationElement.Element("lat");
                    XElement lng = locationElement.Element("lng");
                    if (lat != null && lng != null)
                    {
                        var location = new
                        {
                            Latitude = lat.Value,
                            Longitude = lng.Value
                        };
                        return location;
                    }
                }
                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // Get All Locations
        public IEnumerable<LocationBusinessEntity> GetAllLocations()
        {
            try
            {
                var locations = _unitOfWork.Locations.GetAll().ToList();

                if (locations.Count() != 0)
                {
                    Mapper.CreateMap<Location, LocationBusinessEntity>();
                    var locationEntity = Mapper.Map<List<Location>, List<LocationBusinessEntity>>(locations);
                    return locationEntity;
                }
                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}
