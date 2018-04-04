using BusinessEntities;
using BusinessLayer.DTOs;
using System;
using System.Collections.Generic;

namespace BusinessLayer.IServices
{
    public interface ISearchService
    {
        PagingReturnDto<ProductDto> SuggestionListByUserId(Guid userId, int? count);
        PagingReturnDto<ProductDto> TopRatingProducts(int? count);
        PagingReturnDto<SearchDto> SearchDto_Search(SearchParam searchParam);
    }
}