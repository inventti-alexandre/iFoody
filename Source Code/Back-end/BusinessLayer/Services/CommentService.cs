using AutoMapper;
using BusinessEntities;
using BusinessLayer.IServices;
using DataModel;
using DataModel.IUnitOfWork;
using System;
using System.Transactions;

namespace BusinessLayer.Services
{
    public class CommentService : ICommentService
    {
        private readonly IUnitOfWork _unitOfWork;

        public CommentService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // User insert Comment
        public Guid? InsertComment(CommentBusinessEntity comment)
        {
            try
            {
                using (var scope = new TransactionScope())
                {
                    Mapper.CreateMap<CommentBusinessEntity, Comment>().ForMember(x => x.Id, opt => opt.Ignore());
                    var newCommentModel = Mapper.Map<CommentBusinessEntity, Comment>(comment);

                    _unitOfWork.Comments.Insert(newCommentModel);

                    _unitOfWork.Complete();
                    scope.Complete();

                    return newCommentModel.Id;
                }
            }
            catch (Exception e)
            {
                throw new Exception();
            }
        }

        // Update Comment
        public bool UpdateComment(CommentBusinessEntity newCommentEntity)
        {
            try
            {
                if (newCommentEntity != null)
                {
                    using (var scope = new TransactionScope())
                    {
                        Mapper.CreateMap<CommentBusinessEntity, User>();
                        var comment = Mapper.Map<CommentBusinessEntity, Comment>(newCommentEntity);

                        _unitOfWork.Comments.Update(comment);

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
        public bool DeleteComment(Guid id)
        {
            try
            {
                if (!id.Equals(null))
                {
                    using (var scope = new TransactionScope())
                    {
                        if (_unitOfWork.Comments.Exists(id))
                        {
                            var comment = _unitOfWork.Comments.GetById(id);
                            _unitOfWork.Comments.Delete(comment);

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
