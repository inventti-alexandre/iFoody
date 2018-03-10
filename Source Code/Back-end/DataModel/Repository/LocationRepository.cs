using DataModel.IRepository;
using System;
using System.Linq;

namespace DataModel.Repository
{
    public class LocationRepository : GenericRepository<Location>, ILocationRepository
    {
        private readonly iFoodyEntities _iFoodyContext;

        public LocationRepository(iFoodyEntities iFoodyEntities) : base(iFoodyEntities)
        {
            this._iFoodyContext = iFoodyEntities;
        }
    }
}
