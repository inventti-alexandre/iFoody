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
    public class ProductImageService : IProductImagesService
    {
        private readonly IUnitOfWork _unitOfWork;
        //Constructor
        public ProductImageService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public ProductImageBusinessEntity GetProductImageById(Guid id)
        {
            var productImage = _unitOfWork.ProductImages.GetById(id);
            if (productImage != null)
            {
                Mapper.CreateMap<ProductImage, ProductImageBusinessEntity>();
                var productImageModel = Mapper.Map<ProductImage, ProductImageBusinessEntity>(productImage);
                //var productsModel = new List<ProductBusinessEntity>();
                return productImageModel;
            }
            return null;
        }

        public IEnumerable<ProductImageBusinessEntity> GetAllProductImagesByProductId(Guid Id)
        {
            var productImages = _unitOfWork.ProductImages.GetManyQueryable(x => x.ProductId == Id).ToList();
            if (productImages.Any())
            {
                Mapper.CreateMap<ProductImage, ProductImageBusinessEntity>();
                var productImageModel = Mapper.Map<List<ProductImage>, List<ProductImageBusinessEntity>>(productImages);
                //var productsModel = new List<ProductBusinessEntity>();
                return productImageModel;
            }
            return null;
        }

        public Guid CreateProductImage(ProductImageBusinessEntity productImageEntity)
        {
            using (var scope = new TransactionScope())
            {
                Mapper.CreateMap<ProductImageBusinessEntity, ProductImage>().ForMember(x => x.Id, opt => opt.Ignore());
                var productImage = Mapper.Map<ProductImageBusinessEntity, ProductImage>(productImageEntity);
                _unitOfWork.ProductImages.Insert(productImage);
                _unitOfWork.Complete();
                scope.Complete();
                return productImage.Id;
            }
        }

        public bool DeleteProductImage(Guid ImageId)
        {
            var success = false;

            using (var scope = new TransactionScope())
            {
                var productImage = _unitOfWork.ProductImages.GetById(ImageId);
                if (productImage != null)
                {
                    _unitOfWork.ProductImages.Delete(productImage);
                    _unitOfWork.Complete();
                    scope.Complete();
                    success = true;
                }
            }

            return success;
        }
    }
}
