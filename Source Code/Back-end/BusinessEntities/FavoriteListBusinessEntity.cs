using System;

namespace BusinessEntities
{
    class FavoriteListBusinessEntity
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid? StoreId { get; set; }
        public Guid? ProductId { get; set; }
    }
}
