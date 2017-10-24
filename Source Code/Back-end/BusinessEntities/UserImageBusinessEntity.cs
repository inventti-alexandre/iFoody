using System;

namespace BusinessEntities
{
    public class UserImageBusinessEntity
    {
        public Guid Id { get; set; }
        public Guid? UserId { get; set; }
        public Guid? ImageId { get; set; }

    }
}
