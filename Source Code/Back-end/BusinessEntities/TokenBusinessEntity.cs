using System;

namespace BusinessEntities
{
    public class TokenBusinessEntity
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public string AuthToken { get; set; }
        public DateTime IssuedOn { get; set; }
        public DateTime ExpiresOn { get; set; }
    }
}
