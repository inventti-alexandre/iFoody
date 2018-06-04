using System;
using NReco.CF.Taste.Model;

namespace DataModel.IRepository
{
    public interface IFavoriteListRepository : IGenericRepository<FavoriteList>
    {
        IDataModel LoadStoreRecommender(string prefValFld = null);
        IDataModel LoadProductRecommender(string prefValFld = null);
        long[] GetListIdFromViewByUserId(Guid userId);
        long GetProductKey(Guid productId);
        long GetStoreKey(Guid storeId);
        Guid GetStoreIdByStoreKey(long storeKey);
        Guid GetProductIdByProductKey(long productKey);
    }
}
