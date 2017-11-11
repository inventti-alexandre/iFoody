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
    public class CategoriesService : ICategoriesService
    {
        private readonly IUnitOfWork _unitOfWork;
        //Constructor
        public CategoriesService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public Guid CreateCategory(CategoryBusinessEntity categoryEntity)
        {
            using (var scope = new TransactionScope())
            {
                //productEntity.Id = Guid.NewGuid();
                Mapper.CreateMap<CategoryBusinessEntity, Category>().ForMember(x => x.Id, opt => opt.Ignore());
                var category = Mapper.Map<CategoryBusinessEntity, Category>(categoryEntity);
                _unitOfWork.Categories.Insert(category);
                _unitOfWork.Complete();
                scope.Complete();
                return category.Id;
            }
        }

        public bool DeleteCategory(Guid id)
        {
            var success = false;

            using (var scope = new TransactionScope())
            {
                var category = _unitOfWork.Categories.GetById(id);
                if (category != null)
                {
                    _unitOfWork.Categories.Delete(category);
                    _unitOfWork.Complete();
                    scope.Complete();
                    success = true;
                }
            }

            return success;
        }

        public IEnumerable<CategoryBusinessEntity> GetAllCategories()
        {
            var categories = _unitOfWork.Categories.GetAll().ToList();
            if (categories.Any())
            {
                Mapper.CreateMap<Category, CategoryBusinessEntity>();
                var categoriesModel = Mapper.Map<List<Category>, List<CategoryBusinessEntity>>(categories);
                //var productsModel = new List<ProductBusinessEntity>();
                return categoriesModel;
            }
            return null;
        }

        public CategoryBusinessEntity GetCategoryById(Guid id)
        {
            var category = _unitOfWork.Categories.GetById(id);
            if (category != null)
            {
                Mapper.CreateMap<Product, ProductBusinessEntity>();
                var categoryModel = Mapper.Map<Category, CategoryBusinessEntity>(category);
                //var productsModel = new List<ProductBusinessEntity>();
                return categoryModel;
            }
            return null;
        }

        public bool UpdateCategory(CategoryBusinessEntity categoryEntity)
        {
            var success = false;
            if (categoryEntity != null)
            {
                using (var scope = new TransactionScope())
                {
                    var category = _unitOfWork.Categories.GetById(categoryEntity.Id);
                    if (category != null)
                    {
                        Mapper.CreateMap<CategoryBusinessEntity, Category>().ForMember(x => x.Id, opt => opt.Ignore());
                        Mapper.Map(categoryEntity, category);
                        _unitOfWork.Categories.Update(category);
                        _unitOfWork.Complete();
                        scope.Complete();
                        success = true;
                    }
                }
            }
            return success;
        }
    }
}
