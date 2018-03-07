﻿using AutoMapper;
using BusinessEntities;
using BusinessLayer.DTOs;
using BusinessLayer.IServices;
using DataModel;
using DataModel.IUnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Transactions;
using System.Xml.Linq;

namespace BusinessLayer.Services
{
    public class StoreService : IStoreService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUploadService _uploadService;

        public StoreService(IUnitOfWork unitOfWork, IUploadService uploadService)
        {
            _unitOfWork = unitOfWork;
            _uploadService = uploadService;
        }

        // Get All Store
        public IEnumerable<StoreBusinessEntity> GetAllStore()
        {
            try
            {
                var stores = _unitOfWork.Stores.GetAll().ToList();

                Mapper.CreateMap<Store, StoreBusinessEntity>();
                var storesModel = Mapper.Map<List<Store>, List<StoreBusinessEntity>>(stores);

                return storesModel;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // Get Many Store by List Id
        public IEnumerable<StoreBusinessEntity> GetManyStore(List<Guid> ids)
        {
            try
            {
                if (ids != null)
                {
                    var stores = _unitOfWork.Stores.GetManyQueryable(x => ids.Any(y => y.Equals(x.Id))).ToList();

                    Mapper.CreateMap<Store, StoreBusinessEntity>();
                    var storesModel = Mapper.Map<List<Store>, List<StoreBusinessEntity>>(stores);

                    return storesModel;
                }
            }
            catch (Exception e)
            {
                return null;
            }
            return null;
        }

        // Get One Store By Id
        public StoreDto GetStoreById(Guid? id)
        {
            try
            {
                if (id != null)
                {
                    var store = _unitOfWork.Stores.GetById(id);

                    Mapper.CreateMap<Store, StoreBusinessEntity>();
                    var storeEntity = Mapper.Map<Store, StoreBusinessEntity>(store);
                    if (storeEntity != null)
                    {
                        // Get User
                        var user = _unitOfWork.Users.GetById(storeEntity.UserId.GetValueOrDefault());
                        Mapper.CreateMap<User, UserBusinessEntity>();
                        var userEntity = Mapper.Map<User, UserBusinessEntity>(user);

                        // Get Category
                        var category = _unitOfWork.Categories.GetById(storeEntity.CategoryId.GetValueOrDefault());
                        Mapper.CreateMap<Category, CategoryBusinessEntity>();
                        var categoryEntity = Mapper.Map<Category, CategoryBusinessEntity>(category);

                        // Filter Images
                        var filteredIdImageEntities = _unitOfWork.StoreImages.GetManyQueryable(i => i.StoreId == storeEntity.Id).Select(i => i.ImageId);
                        var filteredImageEntities =
                            _unitOfWork.Images.GetManyQueryable(i => filteredIdImageEntities.Any(x => x == i.Id)).ToList();

                        Mapper.CreateMap<Image, ImageBusinessEntity>();
                        var imageEntities = Mapper.Map<List<Image>, List<ImageBusinessEntity>>(filteredImageEntities).AsEnumerable();

                        var imageBase64Array = new List<string>();
                        foreach (var imageEntity in imageEntities)
                        {
                            var getbase64String = _uploadService.GetBase64StringForImage(imageEntity.Path);
                            imageBase64Array.Add(getbase64String);
                        }

                        var storeDto = new StoreDto()
                        {
                            Name = storeEntity.Name,
                            OpenHour = storeEntity.OpenHour,
                            CloseHour = storeEntity.CloseHour,
                            LowestPrice = storeEntity.LowestPrice,
                            HighestPrice = storeEntity.HighestPrice,
                            Description = storeEntity.Description,
                            RegistrationDate = storeEntity.RegistrationDate,
                            Address = storeEntity.Address,
                            District = storeEntity.District,
                            City = storeEntity.City,
                            //User = userEntity,
                            //Category = categoryEntity,
                            Images = imageBase64Array,
                        };
                        return storeDto;

                    }
                }
            }
            catch (Exception e)
            {
                return null;
            }

            return null;
        }

        // Get One Store By UserId
        public StoreBusinessEntity GetStoreByUserId(Guid userId)
        {
            try
            {

                var store = _unitOfWork.Stores.GetManyQueryable(x => x.UserId == userId).ToList().FirstOrDefault();

                Mapper.CreateMap<Store, StoreBusinessEntity>();
                var storeEntity = Mapper.Map<Store, StoreBusinessEntity>(store);
                if (storeEntity != null)
                {
                    return storeEntity;
                }
                else
                {
                    return null;
                }

            }
            catch (Exception e)
            {
                return null;
            }

            return null;
        }

        // Get Store's Address
        public dynamic GetStoreAddress(List<Guid> ids)
        {
            try
            {
                var storeAddresses =
                     _unitOfWork.Stores.GetManyQueryable(x => ids.Any(y => y.Equals(x.Id)))
                         .Select(i => new { Id = i.Id, Addresses = i.Address });
                //.AsEnumerable();
                // var storeAddress1 = _unitOfWork.Stores.GetAll().Select(i => new { Id = i.Id, Addresses = i.Address }).ToList();

                // var storeAddressEntity= new List<StoreAddressBusinessEntity>();

                // storeAddressEntity.AddRange(storeAddresses.ToList());

                return storeAddresses;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        // Convert Geographic and Address with GeoCoder Google Maps API
        // To DO 04.03
        public dynamic GetLocationFromAddress(string input)
        {
            try
            {
                var address = input;
                string requestUri = string.Format("http://maps.googleapis.com/maps/api/geocode/xml?address={0}&sensor=false", Uri.EscapeDataString(address));

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
                    var location = new
                    {
                        Latitude = lat,
                        Longitude = lng
                    };
                    return location;
                }
                return null;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }



        // User Open Store
        public Guid? OpenStore(StoreDto storeDto)
        {
            try
            {
                if (storeDto != null)
                {
                    Mapper.CreateMap<StoreDto, StoreBusinessEntity>().ForSourceMember(x => x.Images, opt => opt.Ignore()); ;
                    var storeEntity = Mapper.Map<StoreDto, StoreBusinessEntity>(storeDto);


                    using (var scope = new TransactionScope())
                    {

                        Mapper.CreateMap<StoreBusinessEntity, Store>()
                            .ForMember(x => x.Id, opt => opt.Ignore());
                        var store = Mapper.Map<StoreBusinessEntity, Store>(storeEntity);
                        var location = this.GetLocationFromAddress(store.Address);
                        _unitOfWork.Stores.Insert(store);

                        _unitOfWork.Complete();
                        scope.Complete();

                        return store.Id;
                    }
                }

                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // Update Store 
        public bool UpdateStore(StoreBusinessEntity storeEntity)
        {
            try
            {
                if (storeEntity != null)
                {
                    using (var scope = new TransactionScope())
                    {
                        Mapper.CreateMap<StoreBusinessEntity, Store>();
                        var store = Mapper.Map<StoreBusinessEntity, Store>(storeEntity);

                        _unitOfWork.Stores.Update(store);

                        _unitOfWork.Complete();
                        scope.Complete();

                        return true;
                    }
                }
            }
            catch (Exception e)
            {
                throw new Exception();
            }

            return false;
        }

        // Delete Store by Id
        public bool DeleteStore(Guid? id)
        {
            try
            {
                if (id != null)
                {
                    using (var scope = new TransactionScope())
                    {
                        _unitOfWork.Stores.Delete(id);

                        _unitOfWork.Complete();
                        scope.Complete();
                    }
                }
            }
            catch (Exception e)
            {
                throw new Exception();
            }

            return false;
        }


    }
}
