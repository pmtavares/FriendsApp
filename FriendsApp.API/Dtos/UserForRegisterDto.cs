using System;
using System.ComponentModel.DataAnnotations;

namespace FriendsApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage="Password must be minimum of 4 characteres")]
        public string Password { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public string NickName { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime LastActive { get; set; }    
        [Required]
        public string City { get; set; }
        [Required]
        public string Country { get; set; }

        public UserForRegisterDto()
        {
            CreatedAt = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}