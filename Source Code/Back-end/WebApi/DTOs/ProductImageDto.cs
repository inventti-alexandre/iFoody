using System;

namespace WebApi.DTOs
{
    class ProductImageDto
    {
        public Guid Id { get; set; }
        public Guid? ProductId { get; set; }
        public Guid? ImageId { get; set; }
    }
}
