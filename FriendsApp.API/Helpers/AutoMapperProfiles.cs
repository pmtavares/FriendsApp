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

            CreateMap<Photo, PhotoReturnDTO>();
            
            CreateMap<PhotoCreationDTO, Photo>();

            CreateMap<UserForRegisterDto, User>();

            CreateMap<User, UserForRegisterDto>();

            CreateMap<MessageForCreationDto,Message>().ReverseMap();

            CreateMap<Message, MessageToReturnDTO>() 
                    .ForMember(m=> m.SenderPhotoUrl, 
                        opt=> opt.MapFrom(u=>u.Sender.Photos.FirstOrDefault(p=> p.IsMain).Url)) //Populate PhotoUrl DTO
                    .ForMember(m=> m.RecipientPhotoUrl, 
                        opt=> opt.MapFrom(u=>u.Recipient.Photos.FirstOrDefault(p=> p.IsMain).Url));





        }
    }
}