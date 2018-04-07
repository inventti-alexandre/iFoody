using AutoMapper;
using BusinessEntities;
using BusinessLayer.DTOs;
using BusinessLayer.IServices;
using DataModel;
using DataModel.IUnitOfWork;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using System.Web;

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

        // Get Image By id
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

        // Get Image By StoreId
        public IEnumerable<ImageBusinessEntity> GetImageByStoreId(Guid storeId)
        {
            try
            {
                var imageIds =
                    _unitOfWork.StoreImages.GetManyQueryable(x => x.StoreId == storeId).Select(y => y.ImageId).ToList();
                var images = _unitOfWork.Images.GetManyQueryable(x => imageIds.Any(y => y == x.Id)).ToList();
                Mapper.CreateMap<Image, ImageBusinessEntity>();
                var model = Mapper.Map<List<Image>, List<ImageBusinessEntity>>(images);
                return model;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // Get all Image in ProductImage Table - for testing
        public IEnumerable<ProductImageBusinessEntity> GetAllProductImages()
        {
            try
            {

                var productImages = _unitOfWork.ProductImages.GetAll().ToList();

                if (productImages.Count() != 0)
                {
                    Mapper.CreateMap<ProductImage, ProductImageBusinessEntity>();
                    var productImagesEntity = Mapper.Map<List<ProductImage>, List<ProductImageBusinessEntity>>(productImages);
                    return productImagesEntity;
                }
                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // Get all Image in StoreImage Table - for testing
        public IEnumerable<StoreImageBusinessEntity> GetAllStoreImages()
        {
            try
            {

                var storeImages = _unitOfWork.StoreImages.GetAll().ToList();

                if (storeImages.Count() != 0)
                {
                    Mapper.CreateMap<StoreImage, StoreImageBusinessEntity>();
                    var storeImagesEntity = Mapper.Map<List<StoreImage>, List<StoreImageBusinessEntity>>(storeImages);
                    return storeImagesEntity;
                }
                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // No Use - Upload Image (Simplied User or User has Store)  
        public Task<List<FileUploadResult>> UploadImage(List<string> imageStrings, string fileName, Guid? userId, Guid? storeId, Guid? productId)
        {
            try
            {
                if (imageStrings.Count > 0)
                {
                    var uploadedImageIds = new List<Guid>();
                    foreach (var imageString in imageStrings)
                    {
                        byte[] fileContent = System.Convert.FromBase64String(imageString);
                        var uploadPath = HttpContext.Current.Server.MapPath("~/Uploads");
                        var name = fileName;
                        var filePath = Path.Combine(uploadPath, name);

                        using (var scope = new TransactionScope())
                        {
                            File.WriteAllBytes(filePath, fileContent);

                            var imageEntity = new ImageBusinessEntity()
                            {
                                Name = name,
                                Path = filePath
                            };

                            Mapper.CreateMap<ImageBusinessEntity, Image>();
                            var image = Mapper.Map<ImageBusinessEntity, Image>(imageEntity);
                            _unitOfWork.Images.Insert(image);
                            _unitOfWork.Complete();

                            var firstOrDefault =
                                _unitOfWork.Images.GetManyQueryable(i => i.Id == image.Id).FirstOrDefault();
                            if (firstOrDefault != null)
                            {
                                var imageId = firstOrDefault.Id;

                                // Check if Product Image is uploaded
                                if (productId != null)
                                {
                                    var newProductImage = new ProductImage
                                    {
                                        ProductId = productId.GetValueOrDefault(),
                                        ImageId = imageId
                                    };

                                    _unitOfWork.ProductImages.Insert(newProductImage);
                                    _unitOfWork.Complete();
                                }
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

                                if (userId != null)
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
                                scope.Complete();
                                uploadedImageIds.Add(firstOrDefault.Id);
                            }
                        }
                    }
                }
                // return false;
            }
            catch (Exception e)
            {
                return null;
            }
            return null;
        }


        // No use - Delete method
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
