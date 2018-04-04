using AutoMapper;
using BusinessEntities;
using BusinessLayer.DTOs;
using BusinessLayer.IServices;
using DataModel;
using DataModel.IUnitOfWork;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
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
        public List<Guid> UploadFile(List<FileUploadResult> files, bool isOpenStore, Guid storeId, Guid productId, string name)
        {
            try
            {
                if (files.Any())
                {
                    var supportedTypes = new[] { "jpg", "jpeg", "png" };
                    var sizeLimit = 9999999;
                    // Directory.CreateDirectory("~/Content/Uploads/");
                    string path = "";
                    string detailPath;

                    //// Check Guid
                    //if (storeId == null)
                    //{
                    //    storeId = Guid.Empty;
                    //}
                    //if (productId == null)
                    //{
                    //    productId = Guid.Empty;
                    //}

                    // Open Store or Upload Product
                    if (isOpenStore)
                    {
                        //detailPath = System.Web.HttpContext.Current.Server.MapPath("~/Content/Uploads/Stores") +
                        //     '/' + storeId.ToString();
                        detailPath = HostingEnvironment.MapPath("~/Content/Uploads/Stores") +
                             '/' + storeId.ToString();
                    }
                    else
                    {
                        //detailPath = System.Web.HttpContext.Current.Server.MapPath("~/Content/Uploads/Stores/") + storeId.ToString() + '/' + productId.ToString();
                        detailPath = HostingEnvironment.MapPath("~/Content/Uploads/Stores/") + storeId.ToString() + '/' + productId.ToString();
                    }


                    DirectoryInfo dir = Directory.CreateDirectory(detailPath);

                    var imageIds = new List<Guid>();
                    var imageCount = 1;
                    foreach (var file in files)
                    {
                        // Check Supported File Extension and Check size limit

                        var fileExt = Path.GetExtension(file.FileName).Substring(1);

                        // Change File Name
                        // file.FileName = file.FileName.Replace(file.FileName.Substring(0), name.Replace(' ', '-') + imageCount + fileExt);
                        file.FileName = name.Replace(' ', '-') + '-' + imageCount + '.' + fileExt;
                        file.FileName = file.FileName.ToLower();
                        file.FileName = string.Concat(file.FileName.Normalize(NormalizationForm.FormD).Where(
                                c => CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark));

                        imageCount++;
                        ///////////////////
                        if (!supportedTypes.Contains(fileExt) || file.FileLength > sizeLimit)
                        {
                            return null;
                        }
                        // convert string to stream
                        string imageBase64 = file.FileContent.Substring(file.FileContent.IndexOf(',') + 1);
                        var byteArray = Convert.FromBase64String(imageBase64);

                        // byte[] byteArray = Encoding.UTF8.GetBytes(fileContentDecodeBase64);
                        MemoryStream stream = new MemoryStream(byteArray);
                        HttpPostedFileBaseCustom httpPostedFileBaseCustom = new HttpPostedFileBaseCustom(stream,
                            file.FileType, file.FileName);
                        var filePath = Path.Combine(detailPath, file.FileName);
                        httpPostedFileBaseCustom.SaveAs(filePath);

                        // Add link to SQL table
                        var imageEntity = new ImageBusinessEntity()
                        {
                            Name = file.FileName,
                            Path = "~/Content/Uploads/Stores/" + storeId.ToString() + '/' + productId.ToString() + '/' + file.FileName
                    };

                        Mapper.CreateMap<ImageBusinessEntity, Image>();
                        var image = Mapper.Map<ImageBusinessEntity, Image>(imageEntity);
                        _unitOfWork.Images.Insert(image);
                        _unitOfWork.Complete();

                        var firstOrDefault =
                               _unitOfWork.Images.GetManyQueryable(i => i.Id == image.Id).FirstOrDefault();

                        if (firstOrDefault != null) imageIds.Add(firstOrDefault.Id);
                    }
                    return imageIds;
                }
                return null;

            }
            catch (Exception e)
            {
                return null;
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
