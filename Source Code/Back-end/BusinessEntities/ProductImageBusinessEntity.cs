﻿using System;

namespace BusinessEntities
{
    public class ProductImageBusinessEntity
    {
        public Guid Id { get; set; }
        public Guid? ProductId { get; set; }
        public Guid? ImageId { get; set; }
    }
}
