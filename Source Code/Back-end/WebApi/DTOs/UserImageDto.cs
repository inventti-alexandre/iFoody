﻿using System;

namespace WebApi.DTOs
{
    class UserImageDto
    {
        public Guid Id { get; set; }
        public Guid? UserId { get; set; }
        public Guid? ImageId { get; set; }

    }
}
