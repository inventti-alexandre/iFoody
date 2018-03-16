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
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly int _defaultPageRecordCount;

        //Constructor
        public ProductService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _defaultPageRecordCount = 10;
        }

        #region public implement   

        // Get All Products
        public IEnumerable<ProductDto> GetAllProducts()
        {
            try
            {
                // Get All Products Entity List
                var products = _unitOfWork.Products.GetAll().ToList();
                if (products.Any())
                {
                    return ChangeProductsToProductDto(products);
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
        }

        // Tuan made
        // Get All Products - without ProductDto
        public IEnumerable<ProductBusinessEntity> GetAllProductsWithoutDto()
        {
            try
            {
                var products = _unitOfWork.Products.GetAll().ToList();
                if (products.Any())
                {
                    Mapper.CreateMap<Product, ProductBusinessEntity>();
                    var productModel = Mapper.Map<List<Product>, List<ProductBusinessEntity>>(products);
                    return productModel;
                }
                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // Get Product By Id
        public ProductDto GetProductById(Guid productId)
        {
            try
            {
                var product = _unitOfWork.Products.GetById(productId);
                if (product != null)
                {
                    return ConvertProductToProductDto(product);
                }
                else
                {
                    return null;
                }

            }
            catch (Exception e)
            {
                return null;
                throw;
            }
        }

        // Get All Products by category --PHUONG
        public IEnumerable<ProductDto> GetProductsByCategory(Guid categoryId)
        {
            try
            {
                // Get All Products Entity List
                var products = _unitOfWork.Products.GetManyQueryable(x => x.CategoryId == categoryId).ToList();
                if (products.Any())
                {
                    return ChangeProductsToProductDto(products);
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
        }

        // Get Product By Category Id  --TUA
        public IEnumerable<ProductDto> GetProductByCategoryId(Guid categoryId)
        {
            try
            {
                // Get All Products Entity List
                var products = _unitOfWork.Products.GetManyQueryable(p => p.CategoryId == categoryId).ToList();
                Mapper.CreateMap<Product, ProductBusinessEntity>();
                var productEntities = Mapper.Map<List<Product>, List<ProductBusinessEntity>>(products);

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
                        var category = _unitOfWork.Categories.GetById(productEntity.CategoryId.GetValueOrDefault());
                        Mapper.CreateMap<Category, CategoryBusinessEntity>();
                        var categoryEntity = Mapper.Map<Category, CategoryBusinessEntity>(category);

                        // Filter Images
                        var filteredIdImageEntities = _unitOfWork.ProductImages.GetManyQueryable(i => i.ProductId == productEntity.Id).Select(i => i.ImageId);
                        var filteredImageEntities =
                            _unitOfWork.Images.GetManyQueryable(i => filteredIdImageEntities.Any(x => x == i.Id)).ToList();

                        // Map to Image Business Entity
                        Mapper.CreateMap<Image, ImageBusinessEntity>();
                        var imageEntities = Mapper.Map<List<Image>, List<ImageBusinessEntity>>(filteredImageEntities).AsEnumerable();

                        var productDto = new ProductDto()
                        {
                            Product = productEntity,
                            Store = storeEntity,
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

        // Tuan made
        // Update RatingCount Property
        public bool UpdateRatingProperty(Guid productId, int newRating)
        {
            try
            {
                using (var scope = new TransactionScope())
                {
                    if (_unitOfWork.Products.Exists(productId))
                    {

                        var product = _unitOfWork.Products.GetById(productId);

                        if (product.RatingCount == null)
                        {
                            product.Rating = 0.0;
                            product.RatingCount = 0;
                        }

                        product.Rating = (product.Rating * product.RatingCount + newRating) / (product.RatingCount + 1);
                        product.RatingCount = product.RatingCount.Value + 1;

                        _unitOfWork.Products.Update(product);
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

        public IEnumerable<ImageBusinessEntity> GetAllImageByProductId(Guid productId)
        {
            try
            {
                {
                    var productImages = _unitOfWork.ProductImages.GetManyQueryable(x => x.ProductId == productId).ToList();

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

        //paging
        public PagingReturnDto<ProductDto> PagingAllProducts(int page, int? count)
        {
            try
            {
                var allProducts = _unitOfWork.Products.GetAll().ToList();
                if (allProducts.Any())
                {
                    return ChangeProductsToPagingReturnDto(page, count, allProducts);
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
        }
        public PagingReturnDto<ProductDto> PagingAllProductsByCategory(Guid categoryId, int page, int? count)
        {
            try
            {
                var allProducts = _unitOfWork.Products.GetManyQueryable(x => x.CategoryId == categoryId).ToList();
                if (allProducts.Any())
                {
                    return ChangeProductsToPagingReturnDto(page, count, allProducts);
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
        }
        #endregion

        #region Convert to DTO implement
        public ProductDto ConvertProductToProductDto(Product product)
        {
            Mapper.CreateMap<Product, ProductBusinessEntity>();
            var productEntity = Mapper.Map<Product, ProductBusinessEntity>(product);
            //var productsModel = new List<ProductBusinessEntity>();

            // Map to DTO

            // Get Store 
            var store = _unitOfWork.Stores.GetById(productEntity.StoreId.GetValueOrDefault());
            Mapper.CreateMap<Store, StoreBusinessEntity>();
            var storeEntity = Mapper.Map<Store, StoreBusinessEntity>(store);

            // Get category
            var category = _unitOfWork.Categories.GetById(productEntity.CategoryId.GetValueOrDefault());
            Mapper.CreateMap<Category, CategoryBusinessEntity>();
            var categoryEntity = Mapper.Map<Category, CategoryBusinessEntity>(category);

            // Filter Images
            var filteredIdImageEntities =
                _unitOfWork.ProductImages.GetManyQueryable(i => i.ProductId == productEntity.Id)
                    .Select(i => i.ImageId);
            var filteredImageEntities =
                _unitOfWork.Images.GetManyQueryable(i => filteredIdImageEntities.Any(x => x == i.Id)).ToList();

            // Map to Image Business Entity
            Mapper.CreateMap<Image, ImageBusinessEntity>();
            var imageEntities =
                Mapper.Map<List<Image>, List<ImageBusinessEntity>>(filteredImageEntities).AsEnumerable();

            var productDto = new ProductDto()
            {
                Product = productEntity,
                Store = storeEntity,
                Category = categoryEntity,
                Images = imageEntities,

            };
            return productDto;


        }
        public IEnumerable<ProductDto> ChangeProductsToProductDto(List<Product> products)
        {
            Mapper.CreateMap<Product, ProductBusinessEntity>();
            var productEntities = Mapper.Map<List<Product>, List<ProductBusinessEntity>>(products);

            // Get All Images Entity List
            var images = _unitOfWork.Images.GetAll().ToList();

            // Map to DTO         
            var productDtos = new List<ProductDto>();

            foreach (var productEntity in productEntities)
            {
                // Get Store 
                var store = _unitOfWork.Stores.GetById(productEntity.StoreId.GetValueOrDefault());
                Mapper.CreateMap<Store, StoreBusinessEntity>();
                var storeEntity = Mapper.Map<Store, StoreBusinessEntity>(store);

                // Get category
                var category = _unitOfWork.Categories.GetById(productEntity.CategoryId.GetValueOrDefault());
                Mapper.CreateMap<Category, CategoryBusinessEntity>();
                var categoryEntity = Mapper.Map<Category, CategoryBusinessEntity>(category);

                // Filter Images
                var filteredIdImageEntities = _unitOfWork.ProductImages.GetManyQueryable(i => i.ProductId == productEntity.Id).Select(i => i.ImageId);
                var filteredImageEntities =
                    _unitOfWork.Images.GetManyQueryable(i => filteredIdImageEntities.Any(x => x == i.Id)).ToList();

                // Map to Image Business Entity
                Mapper.CreateMap<Image, ImageBusinessEntity>();
                var imageEntities = Mapper.Map<List<Image>, List<ImageBusinessEntity>>(filteredImageEntities).AsEnumerable();

                var productDto = new ProductDto()
                {
                    Product = productEntity,
                    Store = storeEntity,
                    Category = categoryEntity,
                    Images = imageEntities,

                };

                // Add to Product DTO List
                productDtos.Add(productDto);
            }
            //var productsModel = new List<ProductBusinessEntity>();
            return productDtos.AsEnumerable();

        }
        public PagingReturnDto<ProductDto> ChangeProductsToPagingReturnDto(int page, int? count, List<Product> allProducts)
        {
            var takePage = page;
            var takeCount = count ?? _defaultPageRecordCount;
            var totalProducts = allProducts.Count();
            var products = allProducts
                           .OrderByDescending(x => x.CategoryId)
                           .Skip((takePage - 1) * takeCount)
                           .Take(takeCount)
                           .ToList();
            // Map to DTO
            if (products.Any())
            {
                double tempTotalPage = (double)totalProducts / (double)takeCount;
                var productPagingReturnDto = new PagingReturnDto<ProductDto>()
                {
                    currentPage = takePage,
                    totalRecord = totalProducts,
                    totalPage = Convert.ToInt32(Math.Ceiling(tempTotalPage)),
                    Results = ChangeProductsToProductDto(products),
                };
                //var productsModel = new List<ProductBusinessEntity>();
                return productPagingReturnDto;
            }
            else
            {
                return null;
            }

        }
        #endregion

    }
}