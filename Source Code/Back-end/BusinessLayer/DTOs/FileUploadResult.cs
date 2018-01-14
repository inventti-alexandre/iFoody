namespace BusinessLayer.DTOs
{
    public class FileUploadResult
    {
        public string LocalFilePath { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        public long FileLength { get; set; }
        public string FileContent { get; set; }
    }
}
