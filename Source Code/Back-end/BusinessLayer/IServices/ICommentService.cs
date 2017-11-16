using BusinessEntities;
using System;

namespace BusinessLayer.IServices
{
    public interface ICommentService
    {
        Guid? InsertComment(CommentBusinessEntity comment);
        bool UpdateComment(CommentBusinessEntity newCommentEntity);
        bool DeleteComment(Guid id);
    }
}
