import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/_models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>(); //Change the photo in the parent component
  baseUrl = environment.apiUrl;
  currentMain: Photo; //Deal with main current photo. 

  /* Source: https://valor-software.com/ng2-file-upload/ */
  uploader:FileUploader; // = new FileUploader({url: URL});
  hasBaseDropZoneOver: boolean = false;
  //hasAnotherDropZoneOver: boolean = false;
 

  /* End source*/ 
  constructor(private authService: AuthService, 
              private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }
  //Source: https://valor-software.com/ng2-file-upload/ 
  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader()
  {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 5 * 1024 * 1024
    });
    //Allow CORS to the file upload
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false};

    //After the photo is uploaded: This method is for the photo shows right after the upload
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response)
      {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
        if(photo.isMain){
          this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id)
            .subscribe(next=>{
            this.currentMain = this.photos.filter(p=> p.isMain == true)[0]; //Get the main photo from array        
            this.currentMain.isMain = false;
            photo.isMain = true;
            this.getMemberPhotoChange.emit(photo.url);
          }, error => {
            this.alertify.error(error);
          });
        }
      }
    }
  }

  setMainPhoto(photo: Photo)
  {
    return this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id)
      .subscribe(next=>{
        this.currentMain = this.photos.filter(p=> p.isMain == true)[0]; //Get the main photo from array        
        this.currentMain.isMain = false;
        photo.isMain = true;
        this.getMemberPhotoChange.emit(photo.url);
        this.alertify.message("Main photo changed");
      }, error => {
        this.alertify.error(error);
      });
  }

  deletePhoto(id: number)
  {
    var loggedUser = this.authService.decodedToken.nameid
    
    this.alertify.confirm("Delete Photo?","Are you sure you want to delete this photo?", ()=>{
      this.userService.deletePhoto(loggedUser, id)
      .subscribe(next=>{
        this.alertify.message("Success deleted");
        this.photos.splice(this.photos.findIndex(p=> p.id === id),1);
      }, error=>{
        this.alertify.error(error);
      });
    });
  }

}
