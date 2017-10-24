using System;

namespace BusinessEntities
{
    class ProductBusinessEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid? StoreId { get; set; }
    }
}
