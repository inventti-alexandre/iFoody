using DataModel.IRepository;

namespace DataModel.Repository
{
    public class TokenRepository : GenericRepository<Token>, ITokenRepository
    {
        private readonly iFoodyEntities _iFoodyContext;

        public TokenRepository(iFoodyEntities iFoodyEntities) : base(iFoodyEntities)
        {
            this._iFoodyContext = iFoodyEntities;
        }

    }
}

