using System;
using NReco.CF.Taste.Model;

namespace DataModel.IRepository
{
    public interface IFavoriteListRepository : IGenericRepository<FavoriteList>
    {
        IDataModel LoadDbRecommender(string prefValFld = null);
        long[] GetListIdFromViewByUserId(Guid userId);
        Guid GetStoreIdByStoreKey(long storeKey);
    }
}
