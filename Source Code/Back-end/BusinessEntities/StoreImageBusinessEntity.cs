﻿using System;

namespace BusinessEntities
{
    public class StoreImageBusinessEntity
    {
        public Guid Id { get; set; }
        public Guid? StoreId { get; set; }
        public Guid? ImageId { get; set; }
    }
}