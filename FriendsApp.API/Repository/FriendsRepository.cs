using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FriendsApp.API.Data;
using FriendsApp.API.Helpers;
using FriendsApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace FriendsApp.API.Repository
{
    public class FriendsRepository : IFriendsRepository
    {
        private readonly DataContext _context;
        public FriendsRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Photo> GetMainPhoto(int userId)
        {
            var photo = await  _context.Photos.Where(u=> u.UserId == userId).FirstOrDefaultAsync(p=> p.IsMain);
            return photo;
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p=> p.Id == id);
            return photo;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(u=> u.Photos).FirstOrDefaultAsync(u=> u.Id == id);
            return user;
        }

        /*public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.Include(u=> u.Photos).ToListAsync();
            return users;
        }
         */

         //Method below is to implement pages lists
        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users =  _context.Users.Include(u=> u.Photos)
                            .OrderByDescending(u=> u.LastActive).AsQueryable();

            //Not show current user in the list
            users = users.Where(u=> u.Id != userParams.UserId).Where(u=> u.Gender == userParams.Gender);

            //Show the oposite gender
            //users = users.Where(u=> u.Gender == userParams.Gender);

            //Check Min and Max age
            if(userParams.MinAge != 18 || userParams.MaxAge != 99)
            {
                var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

                users = users.Where(u=> u.DateOfBirth >= minDob && u.DateOfBirth <=maxDob);
            }

            //Order by functionality
            if(!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch(userParams.OrderBy)
                {
                    case "createdAt":
                        users = users.OrderByDescending(u=>u.CreatedAt);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}