using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using AutoMapper;
using BusinessEntities;
using BusinessLayer.IServices;
using DataModel;
using DataModel.IUnitOfWork;

namespace BusinessLayer.Services
{
    public class FavoriteListService : IFavoritesListService
    {
        private readonly IUnitOfWork _unitOfWork;
        //Constructor
        public FavoriteListService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public Guid CreateFavoriteItem(FavoriteListBusinessEntity favoriteEntity)
        {
            using (var scope = new TransactionScope())
            {
                Mapper.CreateMap<FavoriteListBusinessEntity, FavoriteList>().ForMember(x => x.Id, opt => opt.Ignore());
                var favoriteItem = Mapper.Map<FavoriteListBusinessEntity, FavoriteList>(favoriteEntity);
                _unitOfWork.FavoriteLists.Insert(favoriteItem);
                _unitOfWork.Complete();
                scope.Complete();
                return favoriteItem.Id;
            }
        }

        public bool DeleteFavoriteItem(Guid Id)
        {
            var success = false;

            using (var scope = new TransactionScope())
            {
                var favoriteItem = _unitOfWork.FavoriteLists.GetById(Id);
                if (favoriteItem != null)
                {
                    _unitOfWork.FavoriteLists.Delete(favoriteItem);
                    _unitOfWork.Complete();
                    scope.Complete();
                    success = true;
                }
            }

            return success;
        }

        public IEnumerable<FavoriteListBusinessEntity> GetFavoriteByUserId(Guid userId)
        {
            var favoriteList = _unitOfWork.FavoriteLists.GetManyQueryable(x => x.UserId == userId).ToList();
            if (favoriteList.Any())
            {
                Mapper.CreateMap<FavoriteList, FavoriteListBusinessEntity>();
                var favoriteListModel = Mapper.Map<List<FavoriteList>, List<FavoriteListBusinessEntity>>(favoriteList);
                return favoriteListModel;
            }
            return null;
        }

        public FavoriteListBusinessEntity GetFavoriteById(Guid Id)
        {
            var favoriteItem = _unitOfWork.FavoriteLists.GetById(Id);
            if (favoriteItem != null)
            {
                Mapper.CreateMap<FavoriteList, FavoriteListBusinessEntity>();
                var favoriteModel = Mapper.Map<FavoriteList, FavoriteListBusinessEntity>(favoriteItem);
                //var productsModel = new List<ProductBusinessEntity>();
                return favoriteModel;
            }
            return null;
        }
    }
}
