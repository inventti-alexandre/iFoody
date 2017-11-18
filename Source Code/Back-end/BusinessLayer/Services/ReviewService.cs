using AutoMapper;
using BusinessEntities;
using BusinessLayer.IServices;
using DataModel;
using DataModel.IUnitOfWork;
using System;
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
