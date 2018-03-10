using BusinessLayer.DTOs;
using BusinessLayer.IServices;
using DataModel.IUnitOfWork;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web.Hosting;

namespace BusinessLayer.Services
{
    public class UploadService : IUploadService
    {
        private readonly IUnitOfWork _unitOfWork;

        public UploadService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // Upload Files
        public bool UploadFile(List<FileUploadResult> files)
        {
            try
            {
                if (files.Any())
                {
                    var supportedTypes = new[] { "jpg", "jpeg", "png" };
                    var sizeLimit = 9999999;
                    // Directory.CreateDirectory("~/Content/Uploads/");
                    var path = HostingEnvironment.MapPath("~/Content/Uploads/");
                    // + @"Content/Uploads/";

                    foreach (var file in files)
                    {
                        // Check Supported File Extension and Check size limit
                        var fileExt = Path.GetExtension(file.FileName).Substring(1);
                        if (!supportedTypes.Contains(fileExt) || file.FileLength > sizeLimit)
                        {
                            return false;
                        }

                        // convert string to stream
                        string imageBase64 = file.FileContent.Substring(file.FileContent.IndexOf(',') + 1);
                        var byteArray = Convert.FromBase64String(imageBase64);

                        // byte[] byteArray = Encoding.UTF8.GetBytes(fileContentDecodeBase64);
                        MemoryStream stream = new MemoryStream(byteArray);
                        HttpPostedFileBaseCustom httpPostedFileBaseCustom = new HttpPostedFileBaseCustom(stream,
                            file.FileType, file.FileName);

                        httpPostedFileBaseCustom.SaveAs(Path.Combine(path, file.FileName));
                    }
                    return true;
                }
                return false;

            }
            catch (Exception e)
            {
                return false;
            }
        }


        // Encode Base 64 String
        public string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        // Decode Base 64 String
        public string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

        // Get Base64 String for Image
        public string GetBase64StringForImage(string imagePath)
        {
            byte[] imageBytes = System.IO.File.ReadAllBytes(imagePath);
            string base64String = Convert.ToBase64String(imageBytes);
            return base64String;
        }

    }


}
