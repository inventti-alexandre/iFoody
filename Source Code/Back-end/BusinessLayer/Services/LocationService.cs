using BusinessLayer.IServices;
using DataModel.IUnitOfWork;

namespace BusinessLayer.Services
{
    public class LocationService : ILocationService
    {
        private readonly IUnitOfWork _unitOfWork;

        // Constructor
        public LocationService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
    }
}
