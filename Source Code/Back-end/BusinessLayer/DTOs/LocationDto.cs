using System;

namespace BusinessLayer.DTOs
{
    public class LocationDto
    {
        public int Id { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public Guid? StoreId { get; set; }
    }
}
