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
    }
}