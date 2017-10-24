using System;

namespace BusinessEntities
{
    class UserImageBusinessEntity
    {
        public Guid Id { get; set; }
        public Guid? UserId { get; set; }
        public Guid? ImageId { get; set; }

    }
}
