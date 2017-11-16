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
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork _unitOfWork;
        //Constructor
        public ProductService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }


        // Get All Products
        public IEnumerable<ProductBusinessEntity> GetAllProducts()
        {
            var products = _unitOfWork.Products.GetAll().ToList();
            if (products.Any())
            {
                Mapper.CreateMap<Product, ProductBusinessEntity>();
                var productsModel = Mapper.Map<List<Product>, List<ProductBusinessEntity>>(products);
                //var productsModel = new List<ProductBusinessEntity>();
                return productsModel;
            }
            return null;
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
    }
}