using System;
using System.ComponentModel.DataAnnotations;

namespace BusinessEntities
{
    public class ReviewBusinessEntity
    {
        public Guid Id { get; set; }
        public string ReviewContent { get; set; }
        public double Rating { get; set; }
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{0:dd/mm/yyyy}")]
        public DateTime Date { get; set; }
        public Guid UserId { get; set; }
        public Guid? ProductId { get; set; }
        public Guid? StoreId { get; set; }
    }
}
