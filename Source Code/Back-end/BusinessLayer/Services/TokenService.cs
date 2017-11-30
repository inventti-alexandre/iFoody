using BusinessEntities;
using BusinessLayer.IServices;
using DataModel;
using DataModel.IUnitOfWork;
using System;
using System.Configuration;
using System.Linq;
using System.Text;

namespace BusinessLayer.Services
{
    public class TokenService : ITokenService
    {
        private readonly IUnitOfWork _unitOfWork;

        // Constructor
        public TokenService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public TokenBusinessEntity GenerateToken(Guid userId)
        {
            string token = Guid.NewGuid().ToString();
            DateTime issuedOn = DateTime.Now;
            DateTime expiredOn = DateTime.Now.AddSeconds(Convert.ToDouble(ConfigurationManager.AppSettings["AuthTokenExpiry"]));
            var tokendomain = new Token
            {
                UserId = userId,
                AuthToken = token,
                IssuedOn = issuedOn,
                ExpiresOn = expiredOn
            };

            _unitOfWork.Tokens.Insert(tokendomain);
            _unitOfWork.Complete();
            var tokenModel = new TokenBusinessEntity()
            {
                UserId = userId,
                AuthToken = token,
                IssuedOn = issuedOn,
                ExpiresOn = expiredOn
            };

            return tokenModel;
        }

        // Check User Credentials
        public Guid? CheckUserCredential(string userCredential)
        {
            try
            {
                String[] decodedStringArray = DecodedStringBase64(userCredential);
                var email = decodedStringArray[0];
                var password = decodedStringArray[1];

                if (!_unitOfWork.Users.EmailExist(email))
                {
                    return null;
                }

                if (_unitOfWork.Users.Get(e => e.Email == email).Password == password)
                {
                    return _unitOfWork.Users.Get(e => e.Email == email).Id;
                }
                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // Decoded Base64 to String
        public String[] DecodedStringBase64(string input)
        {
            byte[] data = Convert.FromBase64String(input);
            string decodedString = Encoding.UTF8.GetString(data);
            String[] decodedStringArray = decodedString.Split(':');
            return decodedStringArray;
        }

        // Validate Auth Token from Client
        public bool ValidateToken(string authToken)
        {
            var token = _unitOfWork.Tokens.Get(t => t.AuthToken == authToken && t.ExpiresOn > DateTime.Now);
            if (token != null && !(DateTime.Now > token.ExpiresOn))
            {
                token.ExpiresOn = token.ExpiresOn.AddSeconds(
                                              Convert.ToDouble(ConfigurationManager.AppSettings["AuthTokenExpiry"]));
                _unitOfWork.Tokens.Update(token);
                _unitOfWork.Complete();
                return true;
            }
            return false;
        }

        // Return User Id from Auth Token
        public Guid? GetUserId(string authToken)
        {
            try
            {
                if (authToken != null)
                {
                    var firstOrDefault = _unitOfWork.Tokens.GetManyQueryable(a => a.AuthToken == authToken).FirstOrDefault();
                    if (firstOrDefault != null)
                        return firstOrDefault.UserId;
                }
                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public bool Kill(string tokenId)
        {
            _unitOfWork.Tokens.Delete(x => x.AuthToken == tokenId);
            _unitOfWork.Complete();
            var isNotDeleted = _unitOfWork.Tokens.GetManyQueryable(x => x.AuthToken == tokenId).Any();
            if (isNotDeleted) { return false; }
            return true;
        }

        public bool DeleteByUserId(Guid userId)
        {
            _unitOfWork.Tokens.Delete(x => x.UserId == userId);
            _unitOfWork.Complete();

            var isNotDeleted = _unitOfWork.Tokens.GetManyQueryable(x => x.UserId == userId).Any();
            return !isNotDeleted;
        }
    }


}
