using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.Extensions
{
  public static class HttpExtensions
  {
    public static void AddPaginationHeader(this HttpResponse response, int CurrentPage, int itemsPerPage, int totalItems, int TotalPages)
    {
      var paginationHeader = new
      {
        CurrentPage,
        itemsPerPage,
        totalItems,
        TotalPages
      };
      response.Headers.Add("pagination", JsonSerializer.Serialize(paginationHeader)); //to json and pagination = key
      response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
      //need to expose the header
    }
  }
}
