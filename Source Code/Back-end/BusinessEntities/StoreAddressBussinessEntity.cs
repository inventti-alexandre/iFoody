using System;
using System.Collections.Generic;

namespace BusinessEntities
{
    public class StoreAddress
    {
        public Guid Id { get; set; }
        public List<string> Addresses { get; set; }
    }
}
