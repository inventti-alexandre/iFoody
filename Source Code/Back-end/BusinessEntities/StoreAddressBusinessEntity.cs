using System;
using System.Collections.Generic;

namespace BusinessEntities
{
    public class StoreAddressBusinessEntity
    {
        public Guid Id { get; set; }

        public List<string> Addresses { get; set; }
    }
}
