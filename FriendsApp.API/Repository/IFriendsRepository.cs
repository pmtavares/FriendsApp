
/*
* Generic repository: Instead of creating different repository
 */
using System.Collections.Generic;
using System.Threading.Tasks;
using FriendsApp.API.Models;

namespace FriendsApp.API.Repository
{
    public interface IFriendsRepository
    {
         void Add<T>(T entity) where T: class;

         void Delete<T>(T entity) where T: class;

         Task<bool> SaveAll();

         Task<IEnumerable<User>> GetUsers();

         Task<User> GetUser(int id);

         Task<Photo> GetPhoto(int id);

         Task<Photo> GetMainPhoto(int userId);
    }
}