using System;
using System.Collections.Generic;
using FriendsApp.API.Models;

namespace FriendsApp.API.Dtos
{
    public class UserDetailDTO
    {
        public int Id {get; set;}
        public string Username { get; set; }

        public string Gender { get; set; }

        public int Age { get; set; }

        public string NickName { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastActive { get; set; }    

        public string Introduction { get; set; }

        public string LookingFor { get; set; }

        public string Interests { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string PhotoUrl { get; set; }

        public ICollection<PhotosDetailDTO> Photos { get; set; }
    }
}