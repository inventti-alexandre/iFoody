using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using BusinessEntities;
using BusinessLayer.IServices;
using DataModel;
using DataModel.IUnitOfWork;
namespace BusinessLayer.Services
{
    public class ProductService: IProductService
    {
        private readonly IUnitOfWork _unitOfWork;
        // Constructor
        public ProductService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<UserBusinessEntity, User>();
            });
        }
      

        public void CreateProduct(ProductBusinessEntity productEntity)
        {
            throw new NotImplementedException();
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
                var productsModel = Mapper.Map<List<Product>, List<ProductBusinessEntity>>(products);
                return productsModel;
            }
            return null;
        }

        public ProductBusinessEntity GetProductById(Guid productId)
        {
            throw new NotImplementedException();
            
        }

        public void UpdateProduct(Guid productId, ProductBusinessEntity productEntity)
        {
            throw new NotImplementedException();
        }   
    }
}
