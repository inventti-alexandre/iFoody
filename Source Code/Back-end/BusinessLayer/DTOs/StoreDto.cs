using System;
using System.Collections.Generic;

namespace BusinessLayer.DTOs
{
    public class StoreDto
    {
        // public StoreBusinessEntity Store { get; set; }

        // public UserBusinessEntity User { get; set; }
        // public CategoryBusinessEntity Category { get; set; }
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
        public Guid? UserId { get; set; }
        public List<string> Images { get; set; }


    }
}
