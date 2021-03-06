//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DataModel
{
    using System;
    using System.Collections.Generic;
    
    public partial class Review
    {
        public System.Guid Id { get; set; }
        public string ReviewContent { get; set; }
        public double Rating { get; set; }
        public System.DateTime Date { get; set; }
        public System.Guid UserId { get; set; }
        public Nullable<System.Guid> ProductId { get; set; }
        public Nullable<System.Guid> StoreId { get; set; }
    
        public virtual Product Product { get; set; }
        public virtual Store Store { get; set; }
        public virtual User User { get; set; }
    }
}
