﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class iFoodyEntities : DbContext
    {
        public iFoodyEntities()
            : base("name=iFoodyEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<CATEGORy> CATEGORIES { get; set; }
        public virtual DbSet<COMMENT> COMMENTS { get; set; }
        public virtual DbSet<FAVOURITE_LISTS> FAVOURITE_LISTS { get; set; }
        public virtual DbSet<IMAGE> IMAGES { get; set; }
        public virtual DbSet<PRODUCT> PRODUCTS { get; set; }
        public virtual DbSet<REVIEW> REVIEWS { get; set; }
        public virtual DbSet<STORE> STORES { get; set; }
        public virtual DbSet<USER> USERS { get; set; }
        public virtual DbSet<PRODUCT_IMAGES> PRODUCT_IMAGES { get; set; }
        public virtual DbSet<STORE_IMAGES> STORE_IMAGES { get; set; }
        public virtual DbSet<USER_IMAGES> USER_IMAGES { get; set; }
    }
}