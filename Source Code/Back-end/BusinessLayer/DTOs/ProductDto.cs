using System.Collections.Generic;
using BusinessEntities;

namespace BusinessLayer.DTOs
{
    public class ProductDto
    {
        public ProductBusinessEntity Product { get; set; }
        public IEnumerable<ImageBusinessEntity> Images { get; set; }
        public StoreBusinessEntity Store { get; set; }
        public CategoryBusinessEntity Category { get; set; }
    }
}