﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using BusinessEntities;
using BusinessLayer.IServices;

namespace WebApi.ApiController
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SearchController : System.Web.Http.ApiController
    {
        private readonly ISearchService _searchService;
        public SearchController(ISearchService searchService)
        {
            _searchService = searchService;
        }
        //Search by product name
        // GET api/search/?productName=
        [HttpGet]
        public IHttpActionResult SearchByProductName(string productName)
        {
            try
            {
                var products = _searchService.SearchByProductName(productName);
                if (products == null)
                {
                    return NotFound(); // Returns a NotFoundResult
                }
                return Ok(products);  // Returns an OkNegotiatedContentResult
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
        //Search by store info
        // GET api/search/?searchString=
        [HttpGet]
        public IHttpActionResult SearchByStoreInfo(string searchString)
        {
            try
            {
                var products = _searchService.SearchByStoreInfo(searchString);
                if (products == null)
                {
                    return NotFound(); // Returns a NotFoundResult
                }
                return Ok(products);  // Returns an OkNegotiatedContentResult
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
        //Search by category name
        // GET api/search/?categoryName=
        [HttpGet]
        public IHttpActionResult SearchByCategoryName(string categoryName)
        {
            try
            {
                var products = _searchService.SearchByCategoryName(categoryName);
                if (products == null)
                {
                    return NotFound(); // Returns a NotFoundResult
                }
                return Ok(products);  // Returns an OkNegotiatedContentResult
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
        // GET api/search/?userId=?&count
        [HttpGet]
        public IHttpActionResult SuggestionListByUserId(Guid userId, int? count)
        {
            try
            {
                var products = _searchService.SuggestionListByUserId(userId,count);
                if (products == null)
                {
                    return NotFound(); // Returns a NotFoundResult
                }
                return Ok(products);  // Returns an OkNegotiatedContentResult
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }
        // GET api/search/?count={?}
        [HttpGet]
        public IHttpActionResult SuggestionListByRatingProduct(int ? count)
        {
            try
            {
                var products = _searchService.TopRatingProducts(count);
                if (products == null)
                {
                    return NotFound(); // Returns a NotFoundResult
                }
                return Ok(products);  // Returns an OkNegotiatedContentResult
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }       
        [HttpPost]
        public IHttpActionResult Searching([FromBody]  SearchParam searchParam)
        {
            try
            {
                return Ok(_searchService.Searching(searchParam));                
            }
            catch (Exception e)
            {
                return NotFound();
            }

        }
       
    }
}
