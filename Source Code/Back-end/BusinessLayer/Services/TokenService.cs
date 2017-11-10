using BusinessEntities;
using BusinessLayer.IServices;
using DataModel;
using DataModel.IUnitOfWork;
using System;
using System.Configuration;
using System.Linq;

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
            DateTime expiredOn = DateTime.Now.AddSeconds(
                                              Convert.ToDouble(ConfigurationManager.AppSettings["AuthTokenExpiry"]));
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
                IssuedOn = issuedOn,
                ExpiresOn = expiredOn,
                AuthToken = token
            };

            return tokenModel;
        }

        public bool ValidateToken(string tokenId)
        {
            var token = _unitOfWork.Tokens.Get(t => t.AuthToken == tokenId && t.ExpiresOn > DateTime.Now);
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
