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
    
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<FavoriteList> FavoriteLists { get; set; }
        public virtual DbSet<Image> Images { get; set; }
        public virtual DbSet<Location> Locations { get; set; }
        public virtual DbSet<ProductImage> ProductImages { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Review> Reviews { get; set; }
        public virtual DbSet<StoreImage> StoreImages { get; set; }
        public virtual DbSet<Store> Stores { get; set; }
        public virtual DbSet<Token> Tokens { get; set; }
        public virtual DbSet<UserImage> UserImages { get; set; }
        public virtual DbSet<User> Users { get; set; }
    }
}
