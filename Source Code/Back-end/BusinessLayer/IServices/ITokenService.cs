using BusinessEntities;
using System;

namespace BusinessLayer.IServices
{
    public interface ITokenService
    {

        TokenBusinessEntity GenerateToken(Guid userId);

        bool ValidateToken(string tokenId);

        bool Kill(string tokenId);

        bool DeleteByUserId(Guid userId);
    }
}
