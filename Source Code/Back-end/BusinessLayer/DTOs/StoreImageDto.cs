﻿using System;

namespace BusinessLayer.DTOs
{
    public class StoreImageDto
    {
        public Guid Id { get; set; }
        public Guid? StoreId { get; set; }
        public Guid? ImageId { get; set; }
    }
}
