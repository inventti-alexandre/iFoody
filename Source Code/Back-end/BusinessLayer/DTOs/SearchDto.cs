using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessEntities;

namespace BusinessLayer.DTOs
{
    public class SearchDto
    {
        public IEnumerable<ImageBusinessEntity> Images { get; set; }
        public StoreBusinessEntity Store { get; set; }
        public CategoryBusinessEntity Category { get; set; }
        public double Distance { get; set; }
    }
}
