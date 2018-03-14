using BusinessEntities;
using BusinessLayer.DTOs;
using System;
using System.Collections.Generic;

namespace BusinessLayer.IServices
{
    public interface ISearchService
    {
        IEnumerable<ProductDto> SearchByProductName(string productName);
        IEnumerable<ProductDto> SearchByStoreInfo(string searchString);
        IEnumerable<ProductDto> SearchByCategoryName(string categoryName);
        IEnumerable<ProductDto> SuggestionListByUserId(Guid userId);
        PagingReturnDto<ProductDto> SearchPaging(string searchString, int page, int? count);

    }
}