using AutoMapper;
using BusinessEntities;
using DataModel;
using DataModel.IUnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using BusinessLayer.IServices;

namespace BusinessLayer.Services
{
    public class StoreService : IStoreService
    {
        private readonly IUnitOfWork _unitOfWork;

        public StoreService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // Get All Store
        public IEnumerable<StoreBusinessEntity> GetAllStore()
        {
            try
            {
                var stores = _unitOfWork.Stores.GetAll().ToList();

                Mapper.CreateMap<Store, StoreBusinessEntity>().ForMember(x => x.Id, opt => opt.Ignore());
                var storesModel = Mapper.Map<List<Store>, List<StoreBusinessEntity>>(stores);

                return storesModel;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // Get Many Store by List Id
        public IEnumerable<StoreBusinessEntity> GetManyStore(List<Guid> ids)
        {
            try
            {
                if (ids != null)
                {
                    var stores = _unitOfWork.Stores.GetManyQueryable(x => ids.Any(y => y.Equals(x.Id))).ToList();

                    Mapper.CreateMap<Store, StoreBusinessEntity>();
                    var storesModel = Mapper.Map<List<Store>, List<StoreBusinessEntity>>(stores);

                    return storesModel;
                }
            }
            catch (Exception e)
            {
                return null;
            }
            return null;
        }

        // Get One Store By Id
        public StoreBusinessEntity GetStoreById(Guid? id)
        {
            try
            {
                if (id != null)
                {
                    var store = _unitOfWork.Stores.GetById(id);

                    Mapper.CreateMap<Store, StoreBusinessEntity>();
                    var storeModel = Mapper.Map<Store, StoreBusinessEntity>(store);

                    return storeModel;
                }
            }
            catch (Exception e)
            {
                return null;
            }

            return null;
        }

        // User Open Store
        public Guid? OpenStore(StoreBusinessEntity storeEntity)
        {
            try
            {
                if (storeEntity != null)
                {
                    using (var scope = new TransactionScope())
                    {
                        Mapper.CreateMap<StoreBusinessEntity, Store>().ForMember(x => x.Id, opt => opt.Ignore());
                        var store = Mapper.Map<StoreBusinessEntity, Store>(storeEntity);

                        _unitOfWork.Stores.Insert(store);

                        _unitOfWork.Complete();
                        scope.Complete();

                        return store.Id;
                    }
                }

                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        // Update Store 
        public bool UpdateStore(StoreBusinessEntity storeEntity)
        {
            try
            {
                if (storeEntity != null)
                {
                    using (var scope = new TransactionScope())
                    {
                        Mapper.CreateMap<StoreBusinessEntity, Store>();
                        var store = Mapper.Map<StoreBusinessEntity, Store>(storeEntity);

                        _unitOfWork.Stores.Update(store);

                        _unitOfWork.Complete();
                        scope.Complete();

                        return true;
                    }
                }
            }
            catch (Exception e)
            {
                throw new Exception();
            }

            return false;
        }

        // Delete Store by Id
        public bool DeleteStore(Guid? id)
        {
            try
            {
                if (id != null)
                {
                    using (var scope = new TransactionScope())
                    {
                        _unitOfWork.Stores.Delete(id);

                        _unitOfWork.Complete();
                        scope.Complete();
                    }
                }
            }
            catch (Exception e)
            {
                throw new Exception();
            }

            return false;
        }
    }
}
