using AutoMapper;
using BusinessEntities;
using BusinessLayer.IServices;
using DataModel;
using DataModel.IUnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;

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

        public IEnumerable<UserBusinessEntity> GetAllUsers()
        {
            try
            {
                var users = _unitOfWork.Users.GetAll().ToList();
                if (users.Any())
                {
                    Mapper.CreateMap<User, UserBusinessEntity>();
                    var userModel = Mapper.Map<List<User>, List<UserBusinessEntity>>(users);
                    return userModel;
                }
                return null;
            }
            catch (Exception e)
            {
                return null;

            }

        }
    }
}
