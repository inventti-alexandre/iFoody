using BusinessLayer.DTOs;
using System;
using System.Collections.Generic;

namespace BusinessLayer.IServices
{
    public interface IUploadService
    {
        // Upload File
        List<Guid> UploadFile(List<FileUploadResult> files, bool isOpenStore, Guid storeId, Guid productId, string name);

        // Delete File
        bool DeleteFile(Guid id);

        // Encode Base 64 String
        string Base64Encode(string plainText);

        // Decode Base 64 String
        string Base64Decode(string base64EncodedData);

        // Get Base64 String for Image
        string GetBase64StringForImage(string imagePath);
    }
}
