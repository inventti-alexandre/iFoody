using BusinessEntities;
using System;

namespace BusinessLayer.IServices
{
    public interface IReviewService
    {
        Guid? InsertReview(ReviewBusinessEntity review);
        bool UpdateReview(ReviewBusinessEntity newReviewEntity);
        bool DeleteReview(Guid id);
    }
}
