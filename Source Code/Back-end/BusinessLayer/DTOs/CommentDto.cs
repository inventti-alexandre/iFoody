using System;

namespace BusinessLayer.DTOs
{
    public class CommentDto
    {
        public Guid Id { get; set; }
        public string ReviewContent { get; set; }
        public double? Rating { get; set; }
        public DateTime Date { get; set; }
        public Guid? UserId { get; set; }
        public Guid? ProductId { get; set; }
        public Guid? StoreId { get; set; }
    }
}
