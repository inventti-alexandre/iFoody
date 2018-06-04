using System;
using System.Collections.Generic;
using System.Linq;
using DataModel.IRepository;
using NReco.CF.Taste.Impl.Common;
using NReco.CF.Taste.Impl.Model;
using NReco.CF.Taste.Model;

namespace DataModel.Repository
{
    public class FavoriteView
    {
        public Guid UserId { get; set; }
        public Guid StoreId { get; set; }
        public long StoreKey { get; set; }
    }

    public class RecommenderView
    {
        public long AttributeKey { get; set; }
        public long ItemKey { get; set; }  
    }
    public class FavoriteListRepository : GenericRepository<FavoriteList>, IFavoriteListRepository
    {
        private iFoodyEntities _iFoodyContext;

        public FavoriteListRepository(iFoodyEntities iFoodyEntities) : base(iFoodyEntities)
        {
            this._iFoodyContext = iFoodyEntities;
        }

        public long[] GetListIdFromViewByUserId(Guid userId)
        {
            string sql = "select * from FavoriteListView where UserId = '" + userId + "' ORDER BY (UserId)";
            var dbRdr = _iFoodyContext.Database.SqlQuery<FavoriteView>(sql).AsQueryable().ToList();           
            if (dbRdr.Any())
            {
                long[] listId = new long[dbRdr.Count()];
                for(int i= 0;i<listId.Length;i++)
                {
                    listId[i] = dbRdr[i].StoreKey;
                }
                return listId;
            }
            else
            {
                return null;
            }
        }
        public long GetProductKey(Guid productId)
        {
            string sql = "select ProductKey from ProductIdView where ProductId = '" + productId + "'";
            long productKey = _iFoodyContext.Database.SqlQuery<long>(sql).FirstOrDefault();
            return productKey;
        }
        public long GetStoreKey(Guid storeId)
        {
            string sql = "select StoreKey from StoresIdView where StoreId = '" + storeId + "'";
            long storeKey = _iFoodyContext.Database.SqlQuery<long>(sql).FirstOrDefault();
            return storeKey;
        }

        public Guid GetProductIdByProductKey(long productKey)
        {
            string sql = "select ProductId from ProductIdView where ProductKey = '" + productKey + "'";
            Guid productId = _iFoodyContext.Database.SqlQuery<Guid>(sql).FirstOrDefault();
            return productId;
        }
      
        public Guid GetStoreIdByStoreKey(long storeKey)
        {
            string sql = "select StoreId from StoresIdView where StoreKey = '" + storeKey + "'";
            Guid storeId = _iFoodyContext.Database.SqlQuery<Guid>(sql).FirstOrDefault();
            return storeId;
        }

        public IDataModel LoadProductRecommender(string prefValFld = null)
        {
            string sql = "select * from RecommenderProductView ORDER BY (ItemKey)";
            var dbRdr = _iFoodyContext.Database.SqlQuery<RecommenderView>(sql).AsQueryable();
            return LoadDb(dbRdr, prefValFld);
        }

        public IDataModel LoadStoreRecommender(string prefValFld = null)
        {
            string sql = "select * from RecommenderStoreView ORDER BY (ItemKey)";
            var dbRdr = _iFoodyContext.Database.SqlQuery<RecommenderView>(sql).AsQueryable();
            return LoadDb(dbRdr, prefValFld);
        }

        #region private implement
        private IDataModel LoadDb(IQueryable<RecommenderView> dbRdr, string prefValFld = null)
        {
            var hasPrefVal = !String.IsNullOrEmpty(prefValFld);
            FastByIDMap<IList<IPreference>> data = new FastByIDMap<IList<IPreference>>();
            foreach (var item in dbRdr)
            {
                long userID = Convert.ToInt64(item.AttributeKey);
                long itemID = Convert.ToInt64(item.ItemKey);

                var userPrefs = data.Get(userID);
                if (userPrefs == null)
                {
                    userPrefs = new List<IPreference>(3);
                    data.Put(userID, userPrefs);
                }

                if (hasPrefVal)
                {
                    var prefVal = Convert.ToSingle(prefValFld);
                    userPrefs.Add(new GenericPreference(userID, itemID, prefVal));
                }
                else
                {
                    userPrefs.Add(new BooleanPreference(userID, itemID));
                }
            }
            var newData = new FastByIDMap<IPreferenceArray>(data.Count());
            foreach (var entry in data.EntrySet())
            {
                var prefList = (List<IPreference>)entry.Value;
                newData.Put(entry.Key, hasPrefVal ?
                    (IPreferenceArray)new GenericUserPreferenceArray(prefList) :
                    (IPreferenceArray)new BooleanUserPreferenceArray(prefList));
            }
            return new GenericDataModel(newData);
        }

        #endregion
    }
}
