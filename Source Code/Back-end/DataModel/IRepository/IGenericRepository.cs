using System;
using System.Collections.Generic;

namespace DataModel.IRepository
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        TEntity Get(Func<TEntity, bool> where);

        TEntity GetById(object id);

        IEnumerable<TEntity> GetAll();

        void Delete(object id);

        void Delete(TEntity entityToDelete);

        void Delete(Func<TEntity, bool> where);

        void Update(TEntity entityToUpdate);

        IEnumerable<TEntity> GetManyQueryable(Func<TEntity, bool> where);

        Boolean Exists(object primaryKey);
    }
}
