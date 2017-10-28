using BusinessLayer.IServices;
using DataModel.IUnitOfWork;
using System;

namespace BusinessLayer.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;

        // Constructor
        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // Bla bla
        // Bla Bla 2
        // Authenticated method by Email and password
        public Guid Authenticate(string email, string password)
        {
            var user = _unitOfWork.Users.Get(u => u.Email == email && u.Password == password);

            if (user != null)
            {
                return user.Id;
            }
            return new Guid(); // Check again!!!!!!!
        }
    }
}
