namespace FriendsApp.API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 20;
        public int PageNumber {get; set;} = 1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize;}
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value;}
        }

        //Filters
        public int UserId {get; set;}
        public string Gender {get; set;}

        //Order
        public string OrderBy {get; set;}

        //More Filters
        public int MinAge{get; set;} = 18;
        public int MaxAge{get; set;} = 99;

        //Users Liked
        public bool Likees { get; set; } = false;
        public bool Likers { get; set; } = false;
    }
}