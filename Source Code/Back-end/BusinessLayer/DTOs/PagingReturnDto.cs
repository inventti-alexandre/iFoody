using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.DTOs
{
    public class PagingReturnDto<T>
    {
        public int currentPage { get; set; }
        public int  totalPage { get; set; }
        public int totalRecord { get; set; }
        public IEnumerable<T> Results { get; set; }

    }
}
