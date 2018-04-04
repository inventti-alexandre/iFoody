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
        PagingReturnDto<ProductDto> SuggestionListByUserId(Guid userId, int? count);
        PagingReturnDto<ProductDto> TopRatingProducts(int? count);
        PagingReturnDto<ProductDto> ProductDto_Searching(SearchParam searchParam);
        PagingReturnDto<SearchDto> SearchDto_Search(SearchParam searchParam);
    }
}