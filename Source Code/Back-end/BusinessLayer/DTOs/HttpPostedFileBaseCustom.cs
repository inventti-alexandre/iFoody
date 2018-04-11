using System;
using System.IO;
using System.Web;
using System.Web.Hosting;

namespace BusinessLayer.DTOs
{
    public class HttpPostedFileBaseCustom : HttpPostedFileBase
    {
        MemoryStream stream;
        string contentType;
        string fileName;

        public HttpPostedFileBaseCustom(MemoryStream stream, string contentType, string fileName)
        {
            this.stream = stream;
            this.contentType = contentType;
            this.fileName = fileName;
        }
        public override int ContentLength
        {
            get { return (int)stream.Length; }
        }

        public override string ContentType
        {
            get { return contentType; }
        }

        public override string FileName
        {
            get { return fileName; }
        }

        public override Stream InputStream
        {
            get { return stream; }
        }

        public override void SaveAs(string filename)
        {
            using (var file = File.Open(filename, FileMode.CreateNew))
                stream.WriteTo(file);
        }

        public void Delete(string filename)
        {
            try
            {
                if (filename != null)
                {
                    var file = new FileInfo(HostingEnvironment.MapPath(filename));
                    if (file.Exists)
                    {
                        file.Delete();
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
