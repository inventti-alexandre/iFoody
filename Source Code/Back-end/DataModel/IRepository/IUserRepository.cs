namespace DataModel.IRepository
{
    public interface IUserRepository : IGenericRepository<User>
    {
        // Check Exist User with Email
        bool EmailExist(string email);
    }
}
