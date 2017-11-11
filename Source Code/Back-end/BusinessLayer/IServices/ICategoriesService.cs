using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessEntities;

namespace BusinessLayer.IServices
{
    public interface ICategoriesService
    {
        CategoryBusinessEntity GetCategoryById(Guid id);
        IEnumerable<CategoryBusinessEntity> GetAllCategories();
        Guid CreateCategory(CategoryBusinessEntity categoryEntity);
        bool UpdateCategory(CategoryBusinessEntity categoryEntity);
        bool DeleteCategory(Guid id);
    }
}
