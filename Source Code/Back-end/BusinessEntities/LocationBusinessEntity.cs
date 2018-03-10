using System;

namespace BusinessEntities
{
    public class LocationBusinessEntity
    {
        public int Id { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public Guid? StoreId { get; set; }
    }
}
