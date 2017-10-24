using DataModel.IRepository;

namespace DataModel.Repository
{
    public class CommentRepository : GenericRepository<Comment>, ICommentRepository
    {
        private iFoodyEntities _iFoodyContext;

        public CommentRepository(iFoodyEntities iFoodyEntities) : base(iFoodyEntities)
        {
            this._iFoodyContext = iFoodyEntities;
        }
    }
}
