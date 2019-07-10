using System;

namespace FriendsApp.API.Dtos
{
    public class MessageToReturnDTO
    {
        public int Id {get; set;}
        public int SenderId {get; set;}
        public string SenderNickName {get; set;}
        public string SenderPhotoUrl {get; set;}
        public int RecipientId {get; set;}
        public string RecipientNickName {get; set;}
        public string RecipientPhotoUrl {get; set;}
        public string content {get; set;}
        public bool IsReads {get; set;}
        public DateTime? DateRead {get; set;}
        public DateTime MessageSent {get; set;}
    }
}