using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using BusinessEntities;
using BusinessLayer.IServices;
using DataModel;
using DataModel.IUnitOfWork;
using DataModel.UnitOfWork;
using System.Transactions;

namespace BusinessLayer.Services
{
    public class ProductService: IProductService
    {
        //private readonly IUnitOfWork _unitOfWork;
        // Constructor
        //public ProductService(IUnitOfWork unitOfWork)
        //{
        //    _unitOfWork = unitOfWork;
        //    var config = new MapperConfiguration(cfg => {
        //        cfg.CreateMap<UserBusinessEntity, User>();
        //    });
        //}

        private readonly UnitOfWork _unitOfWork;

        public ProductService()
        {
            _unitOfWork = new UnitOfWork();
          
        }


        public Guid CreateProduct(ProductBusinessEntity productEntity)
        {
            using (var scope = new TransactionScope())
            {
              
                Mapper.CreateMap<ProductBusinessEntity,Product>();
                var product = Mapper.Map<ProductBusinessEntity, Product>(productEntity);
                _unitOfWork.Products.Insert(product);
                _unitOfWork.Complete();
                scope.Complete();
                return product.Id;
            }
        }

        public void DeleteProduct(Guid productId)
        {
            throw new NotImplementedException();
        }

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

        public ProductBusinessEntity GetProductById(Guid productId)
        {
            var product = _unitOfWork.Products.GetById(productId);
            if (product!=null)
            {
                Mapper.CreateMap<Product, ProductBusinessEntity>();
                var productModel = Mapper.Map<Product, ProductBusinessEntity>(product);
                //var productsModel = new List<ProductBusinessEntity>();
                return productModel;
            }
            return null;

        }

        public void UpdateProduct(Guid productId, ProductBusinessEntity productEntity)
        {
            throw new NotImplementedException();
        }   
    }
}
