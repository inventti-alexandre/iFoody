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
    
    public partial class USER
    {
        public int ID { get; set; }
        public string LNAME { get; set; }
        public string FNAME { get; set; }
        public int GENDER { get; set; }
        public string EMAIL { get; set; }
        public string PASSWORD { get; set; }
        public Nullable<System.DateTime> DOB { get; set; }
        public bool IS_ADMIN { get; set; }
    }
}