using System.Linq;
using AutoMapper;
using FriendsApp.API.Dtos;
using FriendsApp.API.Models;

namespace FriendsApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserListDTO>()
                .ForMember(dest=> dest.PhotoUrl, opt =>{
                    opt.MapFrom(src=> src.Photos.FirstOrDefault(p=>p.IsMain).Url);
                })
                //Resolve AGE in DTO
                .ForMember(dest=> dest.Age, opt => {
                    opt.ResolveUsing(d=> d.DateOfBirth.CalculateAge());
                });
            
            CreateMap<User, UserDetailDTO>()
                .ForMember(dest=> dest.PhotoUrl, opt =>{
                    opt.MapFrom(src=> src.Photos.FirstOrDefault(p=>p.IsMain).Url);
                })
                //Resolve AGE in dto
                .ForMember(dest=> dest.Age, opt => {
                    opt.ResolveUsing(d=> d.DateOfBirth.CalculateAge());
                });

            CreateMap<Photo, PhotosDetailDTO>();

            CreateMap<UserUpdateDTO, User>();
        }
    }
}