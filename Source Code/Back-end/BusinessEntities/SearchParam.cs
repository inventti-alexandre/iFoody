using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessEntities
{
    public class SearchParam
    {
        public string searchString { get; set; }
        public int page { get; set; }
        public double currentLatitude { get; set; }
        public double currentLongitude { get; set; }
        public List<Guid> categoriesListId { get; set; }
        public List<String> districtList { get; set; }
        public int count { get; set; }
        public FilterOption filterOption { get; set; }
    }

    public class FilterOption
    {
        public bool location { get; set; }
        public bool categories { get; set; }
        public bool districts { get; set; }
        public bool rating { get; set; }
    }
}
