using BusinessEntities;

namespace BusinessLayer.DTOs
{
    public class ReviewDto
    {
        public ReviewBusinessEntity Review { get; set; }
        public UserBusinessEntity User { get; set; }
        public StoreBusinessEntity Store { get; set; }
        public ProductBusinessEntity Product { get; set; }
        //public Guid Id { get; set; }
        //public string ReviewContent { get; set; }
        //public double Rating { get; set; }
        //public DateTime Date { get; set; }
        //public Guid UserId { get; set; }
        //public Guid? ProductId { get; set; }
        //public Guid? StoreId { get; set; }
    }
}
