using AutoMapper;
using BusinessEntities;
using BusinessLayer.DTOs;
using BusinessLayer.IServices;
using DataModel;
using DataModel.IUnitOfWork;
using DataModel.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using NReco.CF.Taste.Impl.Model;
using NReco.CF.Taste.Impl.Recommender;
using NReco.CF.Taste.Impl.Similarity;
using NReco.CF.Taste.Model;

namespace BusinessLayer.Services
{
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly int _defaultPageRecordCount;
        private readonly IUploadService _uploadService;
        private readonly IProductImageService _productImageService;

        //Constructor
        public ProductService(IUnitOfWork unitOfWork, IUploadService uploadService, IProductImageService productImageService)
        {
            _unitOfWork = unitOfWork;
            _uploadService = uploadService;
            _productImageService = productImageService;
            _defaultPageRecordCount = 10;
        }

        #region public implement   

        // Get All Products
        public IEnumerable<ProductDto> GetAllProducts()
        {
            try
            {
                // Get All Products Entity List
                var products = _unitOfWork.Products.GetProductInfo().ToList();
                if (products.Any())
                {
                    return MapToProductDto(products);
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
                var products = _unitOfWork.Products.GetProductInfo().Where(x => x.product.CategoryId == categoryId).ToList();
                if (products.Any())
                {
                    return MapToProductDto(products);
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

        // Get Product By Category Id  --TUAN
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

        // GET All Products By StoreId -- return Entity -- Tuan Made
        public IEnumerable<ProductInStoreDto> GetProductByStoreId(Guid storeId)
        {
            try
            {
                // Get All Products Entity List
                var products = _unitOfWork.Products.GetManyQueryable(p => p.StoreId == storeId).ToList();
                Mapper.CreateMap<Product, ProductBusinessEntity>();
                var productEntities = Mapper.Map<List<Product>, List<ProductBusinessEntity>>(products);

                // Map to DTO
                if (products.Any())
                {
                    var productInStoreDtos = new List<ProductInStoreDto>();


                    foreach (var productEntity in productEntities)
                    {
                        // Get Store 
                        var store = _unitOfWork.Stores.GetById(storeId);
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

                        var productInStoreDto = new ProductInStoreDto()
                        {
                            Store = storeEntity,
                            Product = productEntity,
                            Category = categoryEntity,
                            Images = imageEntities,
                        };

                        // Add to Product DTO List
                        productInStoreDtos.Add(productInStoreDto);
                    }

                    //var productsModel = new List<ProductBusinessEntity>();
                    return productInStoreDtos.AsEnumerable();
                }
                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // Get All Products By StoreId -- return list Id -- Tuan Made
        public IEnumerable<Guid> GetProductIdsByStoreId(Guid storeId)
        {
            try
            {
                // Get All Products Entity List
                var productIds = _unitOfWork.Products.GetManyQueryable(p => p.StoreId == storeId).Select(x => x.Id).ToList();

                return productIds;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // User upload Product into Store
        public Guid? CreateProduct(UploadProductDto uploadProductDto)
        {
            try
            {
                using (var scope = new TransactionScope())
                {
                    Mapper.CreateMap<UploadProductDto, Product>()
                        .ForSourceMember(x => x.Images, opt => opt.Ignore());
                    var product = Mapper.Map<UploadProductDto, Product>(uploadProductDto);

                    _unitOfWork.Products.Insert(product);
                    _unitOfWork.Complete();

                    ///////////////////Add to Image Table//////////////////////
                    var imagesUploadList = new List<FileUploadResult>();
                    var imageIds = new List<Guid>();

                    foreach (var image in uploadProductDto.Images)
                    {
                        imagesUploadList.Add(image);
                    }

                    if (imagesUploadList.Any())
                    {
                        imageIds = _uploadService.UploadFile(imagesUploadList, false, product.StoreId.GetValueOrDefault(), product.Id, product.Name);
                    }
                    ///////////////////Add to StoreImage Table//////////////////////
                    //var imagesList = _unitOfWork.Images.GetManyQueryable(i => imageIds.Any(item => item == i.Id)).ToList();

                    if (imageIds.Any())
                    {
                        var newProductImagesList = new List<StoreImageBusinessEntity>();

                        foreach (var imageId in imageIds)
                        {
                            var newProductImageEntity = new ProductImageBusinessEntity()
                            {
                                ProductId = product.Id,
                                ImageId = imageId
                            };
                            _productImageService.CreateProductImage(newProductImageEntity);
                        }
                    }
                    /////////////////////////////////////////////////////////////////
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
        public bool UpdateProduct(UploadProductDto uploadProductDto)
        {
            try
            {
                if (uploadProductDto != null)
                {
                    Mapper.CreateMap<UploadProductDto, ProductBusinessEntity>().ForSourceMember(x => x.Images, opt => opt.Ignore());
                    var productEntity = Mapper.Map<UploadProductDto, ProductBusinessEntity>(uploadProductDto);

                    using (var scope = new TransactionScope())
                    {
                        Mapper.CreateMap<ProductBusinessEntity, Product>();
                        var product = Mapper.Map<ProductBusinessEntity, Product>(productEntity);

                        _unitOfWork.Products.Update(product);
                        _unitOfWork.Complete();

                        // Update Image in FileSystem
                        var imagesUploadList = new List<FileUploadResult>();
                        var imageIds = new List<Guid>();

                        foreach (var image in uploadProductDto.Images)
                        {
                            imagesUploadList.Add(image);
                        }

                        if (imagesUploadList.Any())
                        {
                            imageIds = _uploadService.UploadFile(imagesUploadList, true, product.StoreId.GetValueOrDefault(), product.Id, product.Name);
                        }
                        ///////////////////Add to StoreImage Table//////////////////////
                        //var imagesList = _unitOfWork.Images.GetManyQueryable(i => imageIds.Any(item => item == i.Id)).ToList();



                        if (imageIds.Any())
                        {
                            // var newImagesList = imagesList.FindAll(x => imageIds.Any(y => y != x.Id));
                            // Just update new more Image
                            foreach (var imageId in imageIds)
                            {
                                var newProductImageEntity = new ProductImageBusinessEntity()
                                {
                                    ProductId = product.Id,
                                    ImageId = imageId
                                };
                                _productImageService.CreateProductImage(newProductImageEntity);
                            }
                        }
                        scope.Complete();

                        return true;
                    }
                }
                return false;
            }
            catch (Exception)
            {
                return false;
            }
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
                var allProducts = _unitOfWork.Products.GetProductInfo().OrderByDescending(x => x.product.CategoryId).ToList();
                if (allProducts.Any())
                {
                    return PagingProductDto(page, count, allProducts);
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
        public PagingReturnDto<ProductDto> GetSimilarProducts(Guid productId,int page, int? count)
        {
            try
            {
                var ordersDataModel = _unitOfWork.FavoriteLists.LoadProductRecommender();

                // get list id of favorite view -> id of stores which user like
                var productKey = _unitOfWork.FavoriteLists.GetProductKey(productId);

                var modelWithCurrentUser = GetDataModelForNewUser(ordersDataModel, productKey);
                var totalProducts = _unitOfWork.Products.GetTotalProducts();

                var similarity = new LogLikelihoodSimilarity(modelWithCurrentUser);

                // in this example, we have no preference values (scores)
                // to get correct results 'BooleanfPref' recommenders should be used

                var recommender = new GenericBooleanPrefItemBasedRecommender(modelWithCurrentUser, similarity);

                var recommendedItems = recommender.Recommend(PlusAnonymousUserDataModel.TEMP_USER_ID, totalProducts, null);
                if (recommendedItems.Any())
                {
                    List<Guid> productIds = new List<Guid>();
                    foreach (var item in recommendedItems)
                    {
                        productIds.Add(_unitOfWork.FavoriteLists.GetProductIdByProductKey(item.GetItemID()));
                    }
                    var similarProducts = _unitOfWork.Products.GetProductInfo()
                                            .Where(x=>productIds.Any(y=>y==x.product.Id)).ToList();
                    if (similarProducts.Any())
                    {
                        return PagingProductDto(page, count, similarProducts);
                    }
                    else
                    {
                        return null;
                    }
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
                var allProducts = _unitOfWork.Products.GetProductInfo().Where(x => x.product.CategoryId == categoryId).ToList();
                if (allProducts.Any())
                {
                    return PagingProductDto(page, count, allProducts);
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
        public PagingReturnDto<ProductDto> PagingProductDto(int pageIndex, int? count, List<ProductReturn> allProducts)
        {
            var takePage = pageIndex;
            var takeCount = count ?? _defaultPageRecordCount;
            var totalProducts = allProducts.Count();
            var page = new List<ProductReturn>();
            page = allProducts
                    .Skip((takePage - 1) * takeCount)
                    .Take(takeCount)
                    .ToList();
            // Map to DTO
            if (page.Any())
            {
                double tempTotalPage = (double)totalProducts / (double)takeCount;
                var pageDto = new PagingReturnDto<ProductDto>()
                {
                    currentPage = takePage,
                    totalRecord = totalProducts,
                    totalPage = Convert.ToInt32(Math.Ceiling(tempTotalPage)),
                    Results = MapToProductDto(page)
                };
                return pageDto;
            }
            else
            {
                return null;
            }

        }
        public IEnumerable<ProductDto> MapToProductDto(List<ProductReturn> page)
        {
            Mapper.CreateMap<Store, StoreBusinessEntity>();
            Mapper.CreateMap<Category, CategoryBusinessEntity>();
            Mapper.CreateMap<Image, ImageBusinessEntity>();
            Mapper.CreateMap<Product, ProductBusinessEntity>();
            List<ProductDto> pageDto = new List<ProductDto>();
            foreach (var item in page)
            {
                ProductDto mapItem = new ProductDto()
                {
                    Store = Mapper.Map<Store, StoreBusinessEntity>(item.store),
                    Category = Mapper.Map<Category, CategoryBusinessEntity>(item.category),
                    Images = Mapper.Map<List<Image>, List<ImageBusinessEntity>>(item.images),
                    Product = Mapper.Map<Product, ProductBusinessEntity>(item.product),
                };
                pageDto.Add(mapItem);
            }
            return pageDto;
        }
        private ProductDto ConvertProductToProductDto(Product product)
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
        private IDataModel GetDataModelForNewUser(IDataModel baseModel, params long[] preferredItems)
        {
            var plusAnonymModel = new PlusAnonymousUserDataModel(baseModel);
            var prefArr = new BooleanUserPreferenceArray(preferredItems.Length);
            prefArr.SetUserID(0, PlusAnonymousUserDataModel.TEMP_USER_ID);
            for (int i = 0; i < preferredItems.Length; i++)
            {
                prefArr.SetItemID(i, preferredItems[i]);
            }
            plusAnonymModel.SetTempPrefs(prefArr);
            return plusAnonymModel;
        }

        #endregion

    }
}