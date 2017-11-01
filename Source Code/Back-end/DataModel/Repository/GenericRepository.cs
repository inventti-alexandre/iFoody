using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace DataModel.IRepository
{
    public abstract class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        internal iFoodyEntities iFoodyContext;
        internal DbSet<TEntity> dbSet;

        public GenericRepository(iFoodyEntities iFoodyContext)
        {
            this.iFoodyContext = iFoodyContext;
            this.dbSet = iFoodyContext.Set<TEntity>();
        }

        // Have a look in this link to understand these methods ( https://msdn.microsoft.com/en-us/library/jj592676(v=vs.113).aspx )
        // Generic Get method with Lamda Expression to get one record
        public virtual TEntity Get(Func<TEntity, bool> where)
        {
            return this.dbSet.Where(where).FirstOrDefault<TEntity>();
        }

        // Generic Get method on Id
        public virtual TEntity GetById(object id)
        {
            return this.dbSet.Find(id);
        }

        // Generic Get method to get All records
        public virtual IEnumerable<TEntity> GetAll()
        {
            return this.dbSet.ToList();
        }

        //Generic Insert method 
        public virtual void Insert(TEntity entity)
        {
            dbSet.Add(entity);
        }
        // Generic Delete method 
        public virtual void Delete(object id)
        {
            TEntity entityToDelete = this.dbSet.Find(id);
            Delete(entityToDelete);
        }

        // Generic Delete method by Object
        public virtual void Delete(TEntity entityToDelete)
        {
            if (iFoodyContext.Entry(entityToDelete).State == EntityState.Detached)
            {
                this.dbSet.Attach(entityToDelete);
            }
            this.dbSet.Remove(entityToDelete);
        }

        // Generic Delete method with Lamda Expression
        public virtual void Delete(Func<TEntity, bool> where)
        {
            IQueryable<TEntity> objects = this.dbSet.Where<TEntity>(where).AsQueryable();
            foreach (TEntity obj in objects)
            {
                this.dbSet.Remove(obj);
            }
        }
        // Generic Update method 
        public virtual void Update(TEntity entityToUpdate)
        {
            this.dbSet.Attach(entityToUpdate);
            iFoodyContext.Entry(entityToUpdate).State = EntityState.Modified;
        }

        // Generic Get Many Records method with Lamda Expression, like x => x*2
        public virtual IEnumerable<TEntity> GetMany(Func<TEntity, bool> where)
        {
            return dbSet.Where(where).ToList();
        }

        // Generic Get Many Records with with Lamda Expression, but queryable
        public virtual IEnumerable<TEntity> GetManyQueryable(Func<TEntity, bool> where)
        {
            return this.dbSet.Where(where).AsQueryable();
        }

        // Generic Check Existing method in Database
        public virtual Boolean Exists(object primaryKey)
        {
            return this.dbSet.Find(primaryKey) != null;
        }

    }
}
