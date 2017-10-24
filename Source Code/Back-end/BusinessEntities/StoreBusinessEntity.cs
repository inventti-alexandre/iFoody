using System;

namespace BusinessEntities
{
    class StoreBusinessEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public double? Rating { get; set; }
        public TimeSpan OpenHour { get; set; }
        public TimeSpan CloseHour { get; set; }
        public decimal? LowestPrice { get; set; }
        public decimal? HighestPrice { get; set; }
        public string Description { get; set; }
        public DateTime RegistrationDate { get; set; }
        public string Address { get; set; }
        public string District { get; set; }
        public string City { get; set; }
        public Guid? CategoryId { get; set; }
    }
}
