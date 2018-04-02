using BusinessEntities;
using System.Collections.Generic;

namespace BusinessLayer.DTOs
{
    public class ProductInStoreDto
    {
        public StoreBusinessEntity Store { get; set; }
        public ProductBusinessEntity Product { get; set; }
        public IEnumerable<ImageBusinessEntity> Images { get; set; }
        public CategoryBusinessEntity Category { get; set; }
    }
}
