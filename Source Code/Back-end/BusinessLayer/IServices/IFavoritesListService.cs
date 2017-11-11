using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessEntities;

namespace BusinessLayer.IServices
{
    public interface IFavoritesListService
    {
        FavoriteListBusinessEntity GetFavoriteById(Guid Id);
        IEnumerable<FavoriteListBusinessEntity> GetFavoriteByUserId(Guid userId);
        Guid CreateFavoriteItem(FavoriteListBusinessEntity favoriteEntity);
        bool DeleteFavoriteItem(Guid Id);
    }
}
