using AutoMapper;
using BusinessEntities;
using BusinessLayer.IServices;
using DataModel;
using DataModel.IUnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using BusinessLayer.DTOs;

namespace BusinessLayer.Services
{
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork _unitOfWork;
        //Constructor
        public ProductService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


        // Get All Products
        public IEnumerable<ProductDto> GetAllProducts()
        {
            try
            {
                // Get All Products Entity List
                var products = _unitOfWork.Products.GetAll().ToList();
                Mapper.CreateMap<Product, ProductBusinessEntity>();
                var productEntities = Mapper.Map<List<Product>, List<ProductBusinessEntity>>(products);

                // Get All Images Entity List
                var images = _unitOfWork.Images.GetAll().ToList();

             

                // Map to DTO
                if (products.Any())
                {
                    var productDtos = new List<ProductDto>();

                   
                    foreach (var productEntity in productEntities)
                    {
                        // Get Store 
                        var store = _unitOfWork.Stores.GetById(productEntity.StoreId.GetValueOrDefault());
                        Mapper.CreateMap<Store, StoreBusinessEntity>();
                        var storeEntity = Mapper.Map<Store, StoreBusinessEntity>(store);

                        // Get category
                        var category =
                            _unitOfWork.Categories.GetManyQueryable(
                                c => c.Id == productEntity.CategoryId.GetValueOrDefault()).FirstOrDefault();
                        Mapper.CreateMap<Category, CategoryBusinessEntity>();
                        var categoryEntity = Mapper.Map<Category, CategoryBusinessEntity>(category);

                        // Filter Images
                        var filteredIdImageEntities = _unitOfWork.ProductImages.GetManyQueryable(i => i.ProductId == productEntity.Id).Select(i => i.ImageId);
                        var filteredImageEntities =
                            _unitOfWork.Images.GetManyQueryable(i => filteredIdImageEntities.Any(x => x == i.Id)).ToList();

                        // Map to Image Business Entity
                        Mapper.CreateMap<Image, ImageBusinessEntity>();
                        var imageEntities = Mapper.Map<List<Image>, List<ImageBusinessEntity>>(filteredImageEntities).AsEnumerable();

                        var productDto = new ProductDto ()
                        {
                            Product = productEntity,
                            //Store = storeEntity,
                            Category = categoryEntity,
                            Images = imageEntities,
                            
                        };

                        // Add to Product DTO List
                        productDtos.Add(productDto);
                    }
                
                    //var productsModel = new List<ProductBusinessEntity>();
                    return productDtos.AsEnumerable();
                }
                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // Get Product By Id
        public ProductBusinessEntity GetProductById(Guid productId)
        {
            var product = _unitOfWork.Products.GetById(productId);
            if (product != null)
            {
                Mapper.CreateMap<Product, ProductBusinessEntity>();
                var productModel = Mapper.Map<Product, ProductBusinessEntity>(product);
                //var productsModel = new List<ProductBusinessEntity>();
                return productModel;
            }
            return null;
        }

        // Store upload Product
        public Guid? CreateProduct(ProductBusinessEntity productEntity)
        {
            try
            {
                using (var scope = new TransactionScope())
                {

                    //productEntity.Id = Guid.NewGuid();
                    Mapper.CreateMap<ProductBusinessEntity, Product>().ForMember(x => x.Id, opt => opt.Ignore());
                    var product = Mapper.Map<ProductBusinessEntity, Product>(productEntity);
                    _unitOfWork.Products.Insert(product);
                    _unitOfWork.Complete();
                    scope.Complete();
                    return product.Id;
                }
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // Store delete Product
        public bool DeleteProduct(Guid productId)
        {
            var success = false;

            using (var scope = new TransactionScope())
            {
                var product = _unitOfWork.Products.GetById(productId);
                if (product != null)
                {
                    _unitOfWork.Products.Delete(product);
                    _unitOfWork.Complete();
                    scope.Complete();
                    success = true;
                }
            }

            return success;
        }

        // Store update Product
        public bool UpdateProduct(ProductBusinessEntity productEntity)
        {
            var success = false;
            if (productEntity != null)
            {
                using (var scope = new TransactionScope())
                {
                    var product = _unitOfWork.Products.GetById(productEntity.Id);
                    if (product != null)
                    {
                        Mapper.CreateMap<ProductBusinessEntity, Product>().ForMember(x => x.Id, opt => opt.Ignore());
                        Mapper.Map(productEntity, product);
                        _unitOfWork.Products.Update(product);
                        _unitOfWork.Complete();
                        scope.Complete();
                        success = true;
                    }
                }
            }
            return success;
        }

        public IEnumerable<ImageBusinessEntity> GetAllImageByProductId(Guid productId)
        {
            try
            {
                {
                    var productImages = _unitOfWork.ProductImages.GetManyQueryable(x=>x.ProductId==productId).ToList();

                    if (productImages.Any())
                    {
                        var images = _unitOfWork.Images.GetManyQueryable(x => productImages.Any(y => y.Id == x.Id)).ToList();
                
                        Mapper.CreateMap<Image, ImageBusinessEntity>();
                        var imagesModel = Mapper.Map<List<Image>, List<ImageBusinessEntity>>(images);

                        return imagesModel;
                    }
                }
            }
            catch (Exception e)
            {
                return null;
            }
            return null;
        }
    }
}