using BusinessEntities;
using System;
using System.Collections.Generic;
using BusinessLayer.DTOs;

namespace BusinessLayer.IServices
{
    public interface IReviewService
    {
        IEnumerable<ReviewDto> GetReviews(Guid id);
        Guid? InsertReview(ReviewBusinessEntity review);
        bool UpdateReview(ReviewBusinessEntity newReviewEntity);
        bool DeleteReview(Guid id);
    }
}
