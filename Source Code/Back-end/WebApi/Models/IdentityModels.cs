using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;

namespace WebApi.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("iFoodyEntities", throwIfV1Schema: false)
        {
        }
        
        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var entity = modelBuilder.Entity<ApplicationUser>();

            entity.ToTable("Users");

            entity.HasKey(x => x.Id); // Set the primary key
            entity.Ignore(x => x.Id); // Ignore the defined key
            entity.Property(x => x.PasswordHash).HasColumnName("Password");
            entity.Ignore(x => x.PhoneNumber);
            entity.Ignore(x => x.PhoneNumberConfirmed);
            entity.Ignore(x => x.EmailConfirmed);
            entity.Ignore(x => x.LockoutEnabled);
            entity.Ignore(x => x.LockoutEndDateUtc);
            entity.Ignore(x => x.PhoneNumber);
            entity.Ignore(x => x.PhoneNumberConfirmed);
            entity.Ignore(x => x.SecurityStamp);
            entity.Ignore(x => x.TwoFactorEnabled);
            entity.Ignore(x => x.AccessFailedCount);
            entity.Property(x => x.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
        }
    }
}