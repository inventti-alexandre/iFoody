using BusinessEntities;
using BusinessLayer.DTOs;
using System;
using System.Collections.Generic;

namespace BusinessLayer.IServices
{
    public interface IReviewService
    {
        IEnumerable<ReviewBusinessEntity> GetAllReviews();
        IEnumerable<ReviewDto> GetReviews(Guid id);
        Guid? InsertReview(ReviewBusinessEntity review);
        bool UpdateReview(ReviewBusinessEntity newReviewEntity);
        bool DeleteReview(Guid id);
    }
}
