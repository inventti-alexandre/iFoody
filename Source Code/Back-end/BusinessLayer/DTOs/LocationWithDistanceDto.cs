using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessEntities;

namespace BusinessLayer.DTOs
{
    public class LocationWithDistanceDto
    {
        public LocationBusinessEntity location { get; set; }
        public double Distance { get; set; }
    }
}
