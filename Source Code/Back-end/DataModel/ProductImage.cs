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
    
    public partial class ProductImage
    {
        public System.Guid Id { get; set; }
        public System.Guid ProductId { get; set; }
        public System.Guid ImageId { get; set; }
    
        public virtual Image Image { get; set; }
        public virtual Product Product { get; set; }
    }
}
