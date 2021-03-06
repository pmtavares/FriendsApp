using AutoMapper;
using FriendsApp.API.Helpers;
using FriendsApp.API.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Identity.UI.Pages;
using CloudinaryDotNet;
using System.Threading.Tasks;
using FriendsApp.API.Dtos;
using System.Security.Claims;
using CloudinaryDotNet.Actions;
using FriendsApp.API.Models;
using System.Linq;

/*
* Refactor this code ***
 */

namespace FriendsApp.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IFriendsRepository _repo;

        private readonly IMapper _mapper;

        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;

        private Cloudinary _cloudinary;

        public PhotosController(IFriendsRepository repo, IMapper mapper, 
                                IOptions<CloudinarySettings> cloudinaryConfig)
        {
           _repo = repo;
           _mapper = mapper;
           _cloudinaryConfig = cloudinaryConfig;

          Account acc = new Account(
              _cloudinaryConfig.Value.CloudName,
              _cloudinaryConfig.Value.ApiKey,
              _cloudinaryConfig.Value.ApiSecret
          );

         _cloudinary = new Cloudinary(acc);

        }

        [HttpGet("{id}", Name="GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);

            var photo = _mapper.Map<PhotoReturnDTO>(photoFromRepo);
            return Ok(photo);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int userId, 
            [FromForm] PhotoCreationDTO photoCreationDto)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var userFromRepo = await _repo.GetUser(userId);

            var file = photoCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if(file.Length >0 )
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation()
                                            .Width(500)
                                            .Height(500)
                                            .Crop("fill")
                                            .Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }
            photoCreationDto.Url = uploadResult.Uri.ToString();
            photoCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoCreationDto);

            if(!userFromRepo.Photos.Any(u=> u.IsMain))
            {
                photo.IsMain = true;
            }
            userFromRepo.Photos.Add(photo);
            
            if(await _repo.SaveAll())
            {
                //We dont want to return the photo because it contains user's information
                var photoToReturn = _mapper.Map<PhotoReturnDTO>(photo);
                return CreatedAtRoute("GetPhoto", new { id= photo.Id}, photoToReturn);
            }
            return BadRequest("Could not add the photo");


        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int userId, int id)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var user = await _repo.GetUser(userId);

            if(!user.Photos.Any(p=> p.Id == id))
            {
                return Unauthorized();
            }
            var photoFromRepo = await _repo.GetPhoto(id);

            if(photoFromRepo.IsMain)
            {
                return BadRequest("This is already the main photo");
            }

            var currentMainPhoto = await _repo.GetMainPhoto(userId);

            currentMainPhoto.IsMain = false;
            photoFromRepo.IsMain = true;

            if(await _repo.SaveAll())
            {
                return NoContent();
            }

            return BadRequest("Could not set main photo at this time");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int userId, int id)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var user = await _repo.GetUser(userId);

            if(!user.Photos.Any(p=> p.Id == id))
            {
                return Unauthorized();
            }
            var photoFromRepo = await _repo.GetPhoto(id);

            if(photoFromRepo.IsMain)
            {
                return BadRequest("Main photo cannot be deleted");
            }

            if(photoFromRepo.PublicId != null)
            {
                var deleteParams = new DeletionParams(photoFromRepo.PublicId);
                var result = _cloudinary.Destroy(deleteParams);

                if(result.Result == "ok")
                {
                    _repo.Delete(photoFromRepo);
                } 
            }
            else{
                _repo.Delete(photoFromRepo);
            }
            

            if(await _repo.SaveAll())
            {
                return Ok();
            } 
            return BadRequest("Failed to delete the photo");
        }
    }
}