using BusinessEntities;
using BusinessLayer.DTOs;
using System;
using System.Collections.Generic;

namespace BusinessLayer.IServices
{
    public interface ISearchService
    {
        PagingReturnDto<SearchDto> SuggestionListByUserId(Guid userId, int? count);
        PagingReturnDto<SearchDto> TopRatingProducts(int? count);
        PagingReturnDto<SearchDto> SearchDto_Search(SearchParam searchParam);
        PagingReturnDto<SearchDto> GetRecommendation(Guid userId, int? count);
    }
}