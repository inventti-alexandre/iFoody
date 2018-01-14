using BusinessLayer.DTOs;
using System.Collections.Generic;

namespace BusinessLayer.IServices
{
    public interface IUploadService
    {
        // Upload File
        bool UploadFile(List<FileUploadResult> files);

        // Encode Base 64 String
        string Base64Encode(string plainText);

        // Decode Base 64 String
        string Base64Decode(string base64EncodedData);

        // Get Base64 String for Image
        string GetBase64StringForImage(string imagePath);
    }
}
