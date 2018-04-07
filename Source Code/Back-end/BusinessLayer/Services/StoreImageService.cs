using AutoMapper;
using BusinessEntities;
using BusinessLayer.IServices;
using DataModel;
using DataModel.IUnitOfWork;
using System;
using System.Transactions;

namespace BusinessLayer.Services
{
    public class StoreImageService : IStoreImageService
    {
        private readonly IUnitOfWork _unitOfWork;

        public StoreImageService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public Guid CreateStoreImage(StoreImageBusinessEntity storeImageEntity)
        {
            using (var scope = new TransactionScope())
            {
                Mapper.CreateMap<StoreImageBusinessEntity, StoreImage>().ForMember(x => x.Id, opt => opt.Ignore());
                var storeImage = Mapper.Map<StoreImageBusinessEntity, StoreImage>(storeImageEntity);
                _unitOfWork.StoreImages.Insert(storeImage);
                _unitOfWork.Complete();
                scope.Complete();
                return storeImage.Id;
            }
        }
    }
}
