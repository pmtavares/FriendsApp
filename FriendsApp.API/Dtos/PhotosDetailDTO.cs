using System;

namespace FriendsApp.API.Dtos
{
    public class PhotosDetailDTO
    {
        public int Id { get; set; }

        public string Url { get; set; }

        public string Description {get; set;}

        public DateTime DateAdded {get; set;}

        public bool IsMain {get; set;}
    }
}