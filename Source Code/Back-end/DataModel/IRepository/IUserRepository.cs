namespace DataModel.IRepository
{
    public interface IUserRepository : IGenericRepository<User>
    {
        bool EmailExist(string email);
    }
}
