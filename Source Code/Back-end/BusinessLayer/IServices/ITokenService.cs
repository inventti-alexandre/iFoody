﻿using BusinessEntities;
using System;

namespace BusinessLayer.IServices
{
    public interface ITokenService
    {

        TokenBusinessEntity GenerateToken(Guid userId);

        Guid? CheckUserCredential(string signInIuserCredential);

        String[] DecodedStringBase64(string input);

        string EncodedStringBase64(string plainText);

        bool ValidateToken(string tokenId);

        Guid? GetUserId(string authToken);

        bool Kill(string tokenId);

        bool DeleteByUserId(Guid userId);
    }
}
