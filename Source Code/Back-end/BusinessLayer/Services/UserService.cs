using AutoMapper;
using BusinessEntities;
using BusinessLayer.IServices;
using DataModel;
using DataModel.IUnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;

namespace BusinessLayer.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITokenService _tokenService;

        // Constructor
        public UserService(IUnitOfWork unitOfWork, ITokenService tokenService)
        {
            _unitOfWork = unitOfWork;
            _tokenService = tokenService;
        }

        // SignUp
        public Guid? SignUp(UserBusinessEntity user)
        {
            try
            {
                // Check Exist user
                if (_unitOfWork.Users.EmailExist(user.Email))
                {
                    return null;
                }
                using (var scope = new TransactionScope())
                {
                    Mapper.CreateMap<UserBusinessEntity, User>().ForMember(x => x.Id, opt => opt.Ignore());
                    var newUserModel = Mapper.Map<UserBusinessEntity, User>(user);

                    _unitOfWork.Users.Insert(newUserModel);

                    _unitOfWork.Complete();
                    scope.Complete();

                    return newUserModel.Id;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        // Get User By Id
        public UserBusinessEntity GetUserById(Guid id)
        {
            try
            {
                var user = _unitOfWork.Users.GetById(id);
                if (user != null)
                {
                    Mapper.CreateMap<User, UserBusinessEntity>();
                    var model = Mapper.Map<User, UserBusinessEntity>(user);
                    return model;
                }

                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // Update HasStore Variable after Openning Store
        public bool UpdateHasStoreProperty(Guid userId)
        {
            try
            {
                if (_unitOfWork.Users.Exists(userId))
                {
                    using (var scope = new TransactionScope())
                    {
                        if (_unitOfWork.Users.UpdateHasStoreProperty(userId))
                        {
                            _unitOfWork.Complete();
                        }
                        scope.Complete();
                        return true;
                    }
                }
                return false;
            }
            catch (Exception e)
            {
                throw new Exception("Exeption when update HasStore Property");
            }
        }

        // Update User 
        public bool UpdateUser(Guid userId, UserBusinessEntity userEntity)
        {
            try
            {
                if (userEntity != null)
                {
                    using (var scope = new TransactionScope())
                    {
                        //var user = _unitOfWork.Users.GetById(userId);
                        if (_unitOfWork.Users.Exists(userId))
                        {
                            //Mapper.CreateMap<UserBusinessEntity, User>()
                            //    .ForMember(x => x.Password, opt => opt.Ignore())
                            //    .ForMember(x => x.HasStore, opt => opt.Ignore());
                            //var userUpdate = Mapper.Map<UserBusinessEntity, User>(userEntity);
                            var currentUser = _unitOfWork.Users.GetById(userId);
                            currentUser.FirstName = userEntity.FirstName;
                            currentUser.LastName = userEntity.LastName;
                            currentUser.Birthday = userEntity.Birthday;

                            _unitOfWork.Users.Update(currentUser);
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

        // Update User's Password
        public bool UpdateUserPassword(string userCredential)
        {
            try
            {
                if (userCredential != null)
                {
                    using (var scope = new TransactionScope())
                    {
                        String[] decodedStringArray = this._tokenService.DecodedStringBase64(userCredential);
                        var email = decodedStringArray[0];
                        var password = decodedStringArray[1];

                        var currentUser = _unitOfWork.Users.Get(e => e.Email == email);
                        currentUser.Password = password;

                        _unitOfWork.Users.Update(currentUser);
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
        public bool DeleteUser(Guid userId)
        {
            try
            {
                if (!userId.Equals(null))
                {
                    using (var scope = new TransactionScope())
                    {
                        if (_unitOfWork.Users.Exists(userId))
                        {
                            var user = _unitOfWork.Users.GetById(userId);
                            _unitOfWork.Users.Delete(user);
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

        // Authenticated method by Email and password
        public Guid? Authenticate(string email, string password)
        {
            try
            {
                var user = _unitOfWork.Users.Get(u => u.Email == email && u.Password == password);

                return user?.Id;
            }
            catch (Exception e)
            {
                return null;
            }
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

        // Check Review Exist
        public bool CheckReviewExist(Guid? userId, Guid? reviewId)
        {
            try
            {
                if (userId != null & reviewId != null)
                {
                    var reviewCounts = _unitOfWork.Reviews.GetManyQueryable(r => r.UserId == userId).Count();

                    return reviewCounts > 0;
                }
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
