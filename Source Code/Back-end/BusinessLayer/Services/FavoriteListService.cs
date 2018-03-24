using AutoMapper;
using BusinessEntities;
using BusinessLayer.IServices;
using DataModel;
using DataModel.IUnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using BusinessLayer.DTOs;

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

        public Guid InsertFavoriteItem(FavoriteListBusinessEntity favoriteEntity)
        {
            try
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
                return new Guid();
            }
            catch (Exception e)
            {
                return new Guid();
            }

        }

        // Tuan modified
        public bool DeleteFavoriteItem(FavoriteListDto favoriteItemDto)
        {
            try
            {
                using (var scope = new TransactionScope())
                {
                    if (favoriteItemDto != null)
                    {
                        //Mapper.CreateMap<FavoriteListBusinessEntity, FavoriteList>();
                        //var favoriteItem = Mapper.Map<FavoriteListBusinessEntity, FavoriteList>(favoriteEntity);

                        var favoriteEntity = this.GetFavoriteId(favoriteItemDto.ProductId, favoriteItemDto.StoreId);

                        _unitOfWork.FavoriteLists.Delete(favoriteEntity.Id);
                        _unitOfWork.Complete();
                        scope.Complete();

                        return true;
                    }
                }
                return false;
            }
            catch (Exception e)
            {
                return false;
            }
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

        public FavoriteListBusinessEntity GetFavoriteId(Guid? productId, Guid? storeId)
        {
            try
            {
                if (productId == Guid.Empty)
                {
                    productId = null;
                }
                if (storeId == Guid.Empty)
                {
                    storeId = null;
                }

                var favoriteItem = _unitOfWork.FavoriteLists.GetManyQueryable(x => x.ProductId == productId && x.StoreId == storeId)
                    .FirstOrDefault();
                Mapper.CreateMap<FavoriteList, FavoriteListBusinessEntity>();
                var favoriteModel = Mapper.Map<FavoriteList, FavoriteListBusinessEntity>(favoriteItem);

                return favoriteModel;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public FavoriteListBusinessEntity GetFavoriteById(Guid id)
        {
            var favoriteItem = _unitOfWork.FavoriteLists.GetById(id);
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
