import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-update-barber-profile',
  templateUrl: './update-barber-profile.page.html',
  styleUrls: ['./update-barber-profile.page.scss'],
})
export class UpdateBarberProfilePage implements OnInit {

  form: FormGroup
  apiLink=environment.apiLink;
  base64img = ''
  submitAttempt = false
  img = 'demo_user.png'
  barberId = null

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public authService: AuthServiceService,
    public storage: Storage,
    public toastCtrl: ToastController,
    public camera: Camera,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.form = formBuilder.group({
      email: ['',Validators.compose([Validators.required,Validators.email])],
      fname: ['',Validators.compose([Validators.required])],
      lname: ['',Validators.compose([Validators.required])]
    })
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.barberId = this.route.snapshot.paramMap.get('id')
    this.authService.getBarberProfile(this.barberId).subscribe(res=>{
      this.img = res.info.image
      this.form.patchValue({
        fname: res.info.first_name,
        lname: res.info.last_name,
        email: res.info.email
      })

    })
  }

  async openActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image',
      buttons: [{
        text: 'Open Gallery',
        icon: 'image',
        handler: () => {
          this.imageCapturedGallery();
        }
      }, {
        text: 'Take Picture',
        icon: 'camera',
        handler: () => {
          this.imageCaptured();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
  }

  imageCaptured(){
    const options:CameraOptions={
      quality:70,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((ImageData=>{
      this.base64img="data:image/jpeg;base64,"+ImageData;
      //console.log("From camera",this.base64img);
   }),error=>{
     console.log(error);
   })
  }

  imageCapturedGallery(){
    const options:CameraOptions={
      quality:70,
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }

    this.camera.getPicture(options).then((ImageData=>{
      this.base64img="data:image/jpeg;base64,"+ImageData;
      //console.log("From Gallery",this.base64img);
    }),error=>{
      console.log(error);
    })
  }

  onSubmit(){
    this.submitAttempt = true
    if(!this.form.valid){
      return;
    }else{
      this.storage.get('user_info').then(val=>{
        if(this.base64img != ''){
          const data = {
            id: val.id,
            fname: this.form.value.fname,
            lname: this.form.value.lname,
            email: this.form.value.email,
            prev_image: 'public/images/'+this.img,
            prev_image_thumb: 'public/images/thumb_'+this.img,
            image: this.base64img,
          }
          this.authService.UpdateBarberProfile(data).subscribe(res=>{
              this.form.setValue({fname: res.data.first_name,lname: res.data.last_name,email:res.data.email})
              this.img = res.data.image
              this.base64img = ''
            const user = {
              fname: data.fname,
              lname: data.lname,
              id: data.id,
              email: data.email,
              image: this.img
            }
            this.storage.set('user_info',user).then(rr=>{
              this.presentToast('Profile updated')
            })
          })
        }else{
          const data = {
            id: val.id,
            fname: this.form.value.fname,
            lname: this.form.value.lname,
            email: this.form.value.email,
          }
          this.authService.UpdateBarberProfile(data).subscribe(res=>{
            const user = {
              fname: data.fname,
              lname: data.lname,
              id: data.id,
              email: data.email,
              image: this.img
            }
            this.storage.set('user_info',user).then(rr=>{
              this.presentToast('Profile updated')
            })
          })
        }
      })
    }
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
