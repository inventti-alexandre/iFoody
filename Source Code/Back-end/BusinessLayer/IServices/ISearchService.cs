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
        PagingReturnDto<ProductDto> SearchPaging(string searchString, int page, int? count, bool sortByRating);
        PagingReturnDto<ProductDto> TopRatingProducts(int? count);
        PagingReturnDto<ProductDto> Searching(SearchParam searchParam);
    }
}