import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/services/user.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberMessageTab') memberMessageTab: TabsetComponent; //For clicks on different parts go to messages tabs
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private alertify: AlertifyService, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    //this.loadUser();
    this.route.data.subscribe(data => {
      this.user = data['user']; //Same name as in routing navigator
      this.user.photoUrl = this.user.photos.filter(p=>p.isMain == true)[0].url;
    });

    //Get tab parameter and go to message tab in user detail
    this.route.queryParams.subscribe(params =>{
      const selectTab = params['tab'];
      this.memberMessageTab.tabs[selectTab > 0 ? selectTab: 0].active = true;
    });

    this.configureGallery();
  }


  configureGallery(){
    this.galleryOptions = 
      [
        {
            width: '500px',
            height: '500px',
            thumbnailsColumns: 4,
            imageAnimation: NgxGalleryAnimation.Slide,
            preview: false
        }
      ];
      this.galleryImages = this.getImages();
  }

 
  getImages()
  {
    const imageUrls = [];
    for(let i=0; i < this.user.photos.length; i++)
    {
      imageUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      })
    }
    return imageUrls;
  }
 

  // member/4 : This method is no longer required after resolver file
  loadUser()
  {
    this.userService.getUser(
      this.route.snapshot.params['id']).subscribe((user: User)=>{
        this.user = user;
        console.log("User is: "+ user.nickName);
      }, error=>{
        this.alertify.error(error);
      });
  } 
 //Message tab active
  selectTab(tabId: number) {
    this.memberMessageTab.tabs[tabId].active = true;
  }

    

}
