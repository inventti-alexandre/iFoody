﻿namespace DataModel.IRepository
{
    public interface IStoreRepository : IGenericRepository<Store>
    {
        int GetTotalStores();
    }
}
