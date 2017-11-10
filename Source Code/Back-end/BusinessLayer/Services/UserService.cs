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

        // Constructor
        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // SignUp
        public Guid? SignUp(UserBusinessEntity user)
        {
            try
            {
                //var signUpUser = new JavaScriptSerializer().Deserialize<UserBusinessEntity>(signUpUser);
                //var userModel = Mapper.Map<UserBusinessEntity>(userJson);

                // Check Exist user
                if (_unitOfWork.Users.EmailExist(user.Email))
                {
                    return null;
                }
                using (var scope = new TransactionScope())
                {
                    //var newUser = new UserBusinessEntity
                    //{
                    //    LastName = user.LastName,
                    //    FirstName = user.FirstName,
                    //    Gender = user.Gender,
                    //    Email = user.Email,
                    //    Password = user.Password,
                    //    Birthday = user.Birthday,
                    //};

                    Mapper.CreateMap<UserBusinessEntity, User>().ForMember(x => x.Id, opt => opt.Ignore());
                    var newUserModel = Mapper.Map<UserBusinessEntity, User>(user);
                    _unitOfWork.Users.Insert(newUserModel);
                    _unitOfWork.Complete();
                    scope.Complete();
                    return newUserModel.Id;
                }
                //var request = new HttpClient();
                //string json = JsonConvert.SerializeObject(newUser);
                //byte[] bytes = Encoding.UTF8.GetBytes(json);

                //using (Stream stream = await request.GetStreamAsync(request.BaseAddress))
                //{
                //    stream.Write(bytes, 0, bytes.Length);
                //}
                //try
                //{
                //    await request.GetAsync(request.BaseAddress);
                //}
                //catch (Exception ex)
                //{
                //}
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
                            Mapper.CreateMap<UserBusinessEntity, User>();
                            var user = Mapper.Map<UserBusinessEntity, User>(userEntity);
                            _unitOfWork.Users.Update(user);
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
    }
}
