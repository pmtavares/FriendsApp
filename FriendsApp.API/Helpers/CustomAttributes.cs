using System;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace FriendsApp.API.Helpers
{
    public sealed class CustomAttributes : ValidationAttribute
    {

        private readonly int currentUserId;
        public CustomAttributes(string id)
        {
            this.currentUserId = int.Parse(id);
        }
        public override bool IsValid(object value)
        {
            if(VerifyUser(currentUserId))
            {
                return base.IsValid(true);
            }
            return base.IsValid(false);
            
        }

        public bool VerifyUser(int userId)
        {
            ClaimsPrincipal currentUser = new ClaimsPrincipal();
            if(userId != int.Parse(currentUser.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return false;
            }
            return true;
        }
    }
}