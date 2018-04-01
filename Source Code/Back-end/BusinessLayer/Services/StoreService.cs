using AutoMapper;
using BusinessEntities;
using BusinessLayer.DTOs;
using BusinessLayer.IServices;
using DataModel;
using DataModel.IUnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;

namespace BusinessLayer.Services
{
    public class StoreService : IStoreService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUploadService _uploadService;
        private readonly ILocationService _locationService;
        private readonly IStoreImageService _storeImageService;
        private readonly IUserService _userService;

        public StoreService(
            IUnitOfWork unitOfWork,
            IUploadService uploadService,
            ILocationService locationService,
            IStoreImageService storeImageService,
            IUserService userService)
        {
            _unitOfWork = unitOfWork;
            _uploadService = uploadService;
            _locationService = locationService;
            _storeImageService = storeImageService;
            _userService = userService;
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

        // No USE!!!!! Get Store's Address from IDs list
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

        // User Open Store
        public Guid? OpenStore(OpenStoreDto openStoreDto)
        {
            try
            {
                if (openStoreDto != null)
                {

                    Mapper.CreateMap<OpenStoreDto, StoreBusinessEntity>().ForSourceMember(x => x.Images, opt => opt.Ignore());
                    var storeEntity = Mapper.Map<OpenStoreDto, StoreBusinessEntity>(openStoreDto);


                    using (var scope = new TransactionScope())
                    {

                        ///////////////////Add to Store Table//////////////////////
                        Mapper.CreateMap<StoreBusinessEntity, Store>()
                            .ForMember(x => x.Id, opt => opt.Ignore());
                        var store = Mapper.Map<StoreBusinessEntity, Store>(storeEntity);

                        _unitOfWork.Stores.Insert(store);
                        _unitOfWork.Complete();

                        ///////////////////Add to Location Table//////////////////////
                        var fullAddress = store.Address + ' ' + store.District + ' ' + store.City;
                        var location = _locationService.GetLocationFromAddress(fullAddress.Replace("\"", ""));
                        var locationBusinessEntity = new LocationBusinessEntity()
                        {
                            Latitude = System.Convert.ToDecimal(location.GetType().GetProperty("Latitude").GetValue(location, null)),
                            Longitude = System.Convert.ToDecimal(location.GetType().GetProperty("Longitude").GetValue(location, null)),
                            StoreId = store.Id
                        };
                        _locationService.InsertLocation(locationBusinessEntity);
                        _unitOfWork.Complete();

                        ///////////////////Add to Image Table//////////////////////
                        var imagesUploadList = new List<FileUploadResult>();
                        var imageIds = new List<Guid>();

                        foreach (var image in openStoreDto.Images)
                        {
                            imagesUploadList.Add(image);
                        }

                        if (imagesUploadList.Any())
                        {
                            imageIds = _uploadService.UploadFile(imagesUploadList, true, store.Id, Guid.Empty, store.Name);
                        }
                        ///////////////////Add to StoreImage Table//////////////////////
                        var imagesList =
                              _unitOfWork.Images.GetManyQueryable(i => imageIds.Any(item => item == i.Id)).ToList();

                        if (imagesList.Any())
                        {
                            var newProductImagesList = new List<StoreImageBusinessEntity>();

                            foreach (var image in imagesList)
                            {
                                var newStoreImageEntity = new StoreImageBusinessEntity()
                                {
                                    StoreId = store.Id,
                                    ImageId = image.Id
                                };
                                _storeImageService.CreateStoreImage(newStoreImageEntity);
                            }
                        }
                        /////////////////////////////////////////////////////////////////
                        _userService.UpdateHasStoreProperty(openStoreDto.UserId.GetValueOrDefault());
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
        public bool UpdateStore(OpenStoreDto openStoreDto)
        {
            try
            {
                if (openStoreDto != null)
                {
                    using (var scope = new TransactionScope())
                    {
                        Mapper.CreateMap<OpenStoreDto, Store>().ForSourceMember(x => x.Images, opt => opt.Ignore());
                        var store = Mapper.Map<OpenStoreDto, Store>(openStoreDto);

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

        // Tuan made
        // Update RatingCount Property
        public bool UpdateRatingProperty(Guid storeId, int newRating)
        {
            try
            {
                using (var scope = new TransactionScope())
                {
                    if (_unitOfWork.Stores.Exists(storeId))
                    {

                        var store = _unitOfWork.Stores.GetById(storeId);

                        if (store.RatingCount == null)
                        {
                            store.Rating = 0.0;
                            store.RatingCount = 0;
                        }

                        store.Rating = (store.Rating * store.RatingCount + newRating) / (store.RatingCount + 1);
                        store.RatingCount = store.RatingCount.Value + 1;

                        _unitOfWork.Stores.Update(store);
                        _unitOfWork.Complete();
                        scope.Complete();
                        return true;
                    };
                }
                return false;
            }
            catch (Exception e)
            {
                return false;
            }
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
