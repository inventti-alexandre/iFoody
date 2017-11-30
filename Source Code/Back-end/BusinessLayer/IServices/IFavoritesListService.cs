using BusinessEntities;
using System;
using System.Collections.Generic;

namespace BusinessLayer.IServices
{
    public interface IFavoritesListService
    {
        FavoriteListBusinessEntity GetFavoriteById(Guid id);
        IEnumerable<FavoriteListBusinessEntity> GetFavoriteByUserId(Guid userId);
        Guid InsertFavoriteItem(FavoriteListBusinessEntity favoriteEntity);
        bool DeleteFavoriteItem(Guid id);
    }
}
