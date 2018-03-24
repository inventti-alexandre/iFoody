using BusinessEntities;
using BusinessLayer.DTOs;
using System;
using System.Collections.Generic;

namespace BusinessLayer.IServices
{
    public interface IFavoritesListService
    {
        IEnumerable<FavoriteListBusinessEntity> GetFavoriteByUserId(Guid userId);
        Guid InsertFavoriteItem(FavoriteListBusinessEntity favoriteEntity);
        bool DeleteFavoriteItem(FavoriteListDto favoriteItemDto);
        FavoriteListBusinessEntity GetFavoriteId(Guid? productId, Guid? storeId);
        FavoriteListBusinessEntity GetFavoriteById(Guid id);

    }
}
