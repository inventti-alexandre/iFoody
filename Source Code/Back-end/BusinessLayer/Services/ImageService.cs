using AutoMapper;
using BusinessEntities;
using BusinessLayer.IServices;
using DataModel;
using DataModel.IUnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;

namespace BusinessLayer.Services
{
    public class ImageService : IImageService
    {
        private readonly IUnitOfWork _unitOfWork;

        // Constructor
        public ImageService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // Get All Images
        public List<ImageBusinessEntity> GetAll()
        {
            try
            {
                var images = _unitOfWork.Images.GetAll().ToList();
                if (images.Count() != 0)
                {
                    Mapper.CreateMap<Image, ImageBusinessEntity>();
                    var imagesEntity = Mapper.Map<List<Image>, List<ImageBusinessEntity>>(images);
                    return imagesEntity;
                }
            }
            catch (Exception e)
            {
                return null;
            }
            return null;
        }

        public IEnumerable<ImageBusinessEntity> GetImage(Guid id)
        {
            try
            {
                var images = _unitOfWork.Images.GetManyQueryable(x => x.Id == id).ToList();
                Mapper.CreateMap<Image, ImageBusinessEntity>();
                var model = Mapper.Map<List<Image>, List<ImageBusinessEntity>>(images);
                return model;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // Upload Image (Simplied User or User has Store)
        public bool UploadImage(List<ImageBusinessEntity> imagesEntity, Guid? userId, Guid? storeId)
        {
            try
            {
                if (imagesEntity != null)
                {
                    using (var scope = new TransactionScope())
                    {
                        Mapper.CreateMap<ImageBusinessEntity, Image>();
                        var images = Mapper.Map<List<ImageBusinessEntity>, List<Image>>(imagesEntity);
                        foreach (var image in images)
                        {
                            if (image != null)
                            {
                                _unitOfWork.Images.Insert(image);
                                _unitOfWork.Complete();

                                var firstOrDefault =
                                    _unitOfWork.Images.GetManyQueryable(i => i.Id == image.Id).FirstOrDefault();
                                if (firstOrDefault != null)
                                {
                                    var imageId = firstOrDefault.Id;

                                    // Check if User is uploading into Store
                                    if (storeId != null)
                                    {
                                        var newStoreImage = new StoreImage
                                        {
                                            StoreId = storeId.GetValueOrDefault(),
                                            ImageId = imageId
                                        };

                                        _unitOfWork.StoreImages.Insert(newStoreImage);
                                        _unitOfWork.Complete();
                                    }
                                    else
                                    {
                                        // User upload normally
                                        var newUserImage = new UserImage
                                        {
                                            UserId = userId.GetValueOrDefault(),
                                            ImageId = imageId
                                        };

                                        _unitOfWork.UserImages.Insert(newUserImage);
                                        _unitOfWork.Complete();
                                    }
                                }
                            }
                        }
                        scope.Complete();
                        return true;
                    }
                }
                return false;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        // Delete method
        public bool DeleteImage(Guid id)
        {
            try
            {
                using (var scope = new TransactionScope())
                {
                    _unitOfWork.UserImages.Delete(i => i.ImageId == id);
                    _unitOfWork.Images.Delete(id);

                    _unitOfWork.Complete();
                    scope.Complete();
                    return true;
                };
            }
            catch (Exception e)
            {
                return false;
            }
        }

        // Update method
        public bool UpdateImage(ImageBusinessEntity imageEntity)
        {
            try
            {
                if (imageEntity != null)
                {
                    using (var scope = new TransactionScope())
                    {
                        Mapper.CreateMap<ImageBusinessEntity, Image>();
                        var image = Mapper.Map<ImageBusinessEntity, Image>(imageEntity);

                        _unitOfWork.Images.Update(image);
                        _unitOfWork.Complete();
                        scope.Complete();
                        return true;
                    }
                }
                return false;
            }
            catch (Exception e)
            {
                return false;
            }
        }

    }
}
