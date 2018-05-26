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
    public class ReviewService : IReviewService
    {
        private readonly IUnitOfWork _unitOfWork;

        public ReviewService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // Get All Reviews
        public IEnumerable<ReviewBusinessEntity> GetAllReviews()
        {
            try
            {
                var reviews = _unitOfWork.Reviews.GetAll().ToList();
                if (reviews.Any())
                {
                    Mapper.CreateMap<Review, ReviewBusinessEntity>();
                    var reviewModel = Mapper.Map<List<Review>, List<ReviewBusinessEntity>>(reviews);
                    return reviewModel;
                }
                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // Get Reviews from Product Id
        public IEnumerable<ReviewDto> GetProductReviews(Guid id)
        {
            try
            {
                var reviews = _unitOfWork.Reviews.GetManyQueryable(r => r.ProductId == id).ToList();
                var reviewDtos = new List<ReviewDto>();

                if (reviews.Count > 0)
                {
                    Mapper.CreateMap<Review, ReviewBusinessEntity>();
                    var reviewEntities = Mapper.Map<List<Review>, List<ReviewBusinessEntity>>(reviews);
                    //var productsModel = new List<ProductBusinessEntity>();
                    // Map to DTO
                    if (reviewEntities != null)
                    {
                        foreach (var reviewEntity in reviewEntities)
                        {
                            // Get Store 
                            var store = _unitOfWork.Stores.GetById(reviewEntity.StoreId.GetValueOrDefault());
                            Mapper.CreateMap<Store, StoreBusinessEntity>();
                            var storeEntity = Mapper.Map<Store, StoreBusinessEntity>(store);

                            // Get User
                            var user = _unitOfWork.Users.GetById(reviewEntity.UserId);
                            Mapper.CreateMap<User, UserBusinessEntity>();
                            var userEntity = Mapper.Map<User, UserBusinessEntity>(user);

                            // Get Product
                            var product = _unitOfWork.Products.GetById(reviewEntity.ProductId);
                            Mapper.CreateMap<Product, ProductBusinessEntity>();
                            var productEntity = Mapper.Map<Product, ProductBusinessEntity>(product);

                            var reviewDto = new ReviewDto()
                            {
                                Review = reviewEntity,
                                Store = storeEntity,
                                User = userEntity,
                                Product = productEntity

                            };

                            reviewDtos.Add(reviewDto);
                        }
                        return reviewDtos;

                    }

                    //var productsModel = new List<ProductBusinessEntity>();

                    // return productModel;
                }
                return reviewDtos;

            }
            catch (Exception e)
            {
                return null;
                throw;
            }
        }

        // Get Reviews from Store Id
        public IEnumerable<ReviewDto> GetStoreReviews(Guid id)
        {
            try
            {
                var reviews = _unitOfWork.Reviews.GetManyQueryable(r => r.StoreId == id).ToList();
                var reviewDtos = new List<ReviewDto>();

                if (reviews.Count > 0)
                {
                    Mapper.CreateMap<Review, ReviewBusinessEntity>();
                    var reviewEntities = Mapper.Map<List<Review>, List<ReviewBusinessEntity>>(reviews);
                    //var productsModel = new List<ProductBusinessEntity>();

                    // Map to DTO
                    if (reviewEntities != null)
                    {
                        foreach (var reviewEntity in reviewEntities)
                        {
                            // Get Store 
                            var store = _unitOfWork.Stores.GetById(reviewEntity.StoreId.GetValueOrDefault());
                            Mapper.CreateMap<Store, StoreBusinessEntity>();
                            var storeEntity = Mapper.Map<Store, StoreBusinessEntity>(store);

                            // Get User
                            var user = _unitOfWork.Users.GetById(reviewEntity.UserId);
                            Mapper.CreateMap<User, UserBusinessEntity>();
                            var userEntity = Mapper.Map<User, UserBusinessEntity>(user);

                            // Get Product
                            var product = _unitOfWork.Products.GetById(reviewEntity.ProductId);
                            Mapper.CreateMap<Product, ProductBusinessEntity>();
                            var productEntity = Mapper.Map<Product, ProductBusinessEntity>(product);

                            var reviewDto = new ReviewDto()
                            {
                                Review = reviewEntity,
                                Store = storeEntity,
                                User = userEntity,
                                Product = productEntity

                            };

                            reviewDtos.Add(reviewDto);
                        }
                        return reviewDtos;
                    }

                    //var productsModel = new List<ProductBusinessEntity>();

                    // return productModel;
                }
                return reviewDtos;
            }
            catch (Exception e)
            {
                return null;
                throw;
            }
        }

        // User insert Review
        public Guid? InsertReview(ReviewBusinessEntity review)
        {
            try
            {
                using (var scope = new TransactionScope())
                {
                    Mapper.CreateMap<ReviewBusinessEntity, Review>().ForMember(x => x.Id, opt => opt.Ignore());
                    var newReviewModel = Mapper.Map<ReviewBusinessEntity, Review>(review);

                    _unitOfWork.Reviews.Insert(newReviewModel);
                    _unitOfWork.Complete();
                    scope.Complete();

                    return newReviewModel.Id;
                }
            }
            catch (Exception e)
            {
                throw new Exception();
            }
        }

        // Update Review
        public bool UpdateReview(ReviewBusinessEntity newReviewEntity)
        {
            try
            {
                if (newReviewEntity != null)
                {
                    using (var scope = new TransactionScope())
                    {
                        Mapper.CreateMap<ReviewBusinessEntity, User>();
                        var review = Mapper.Map<ReviewBusinessEntity, Review>(newReviewEntity);

                        _unitOfWork.Reviews.Update(review);

                        _unitOfWork.Complete();
                        scope.Complete();

                        return true;
                    }
                }
            }
            catch (Exception e)
            {
                return false;
            }
            return false;
        }

        // Delete User
        public bool DeleteReview(Guid id)
        {
            try
            {
                if (!id.Equals(null))
                {
                    using (var scope = new TransactionScope())
                    {
                        if (_unitOfWork.Reviews.Exists(id))
                        {
                            var review = _unitOfWork.Reviews.GetById(id);
                            _unitOfWork.Reviews.Delete(review);

                            _unitOfWork.Complete();
                            scope.Complete();
                            return true;
                        }
                    }
                }
            }
            catch (Exception e)
            {
                return false;
            }
            return false;
        }

    }
}
