import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AuthServiceService } from '../services/auth-service.service';
import { environment } from 'src/environments/environment';
import { ToastController, ActionSheetController, LoadingController, Events } from '@ionic/angular';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {
  apiLink=environment.apiLink;
  form: FormGroup
  submitAttempt = false
  img = ''
  base64img = ''
  userId = null
  constructor(
    public formBuilder: FormBuilder,
    public storage: Storage,
    public authService: AuthServiceService,
    public toastController: ToastController,
    public camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public loadingController: LoadingController,
    public events: Events
  ) {
    this.form = formBuilder.group({
      fname: ['',Validators.compose([Validators.required])],
      lname: ['',Validators.compose([Validators.required])],
      phone: ['',Validators.compose([Validators.required])],
      email: ['',Validators.compose([Validators.required,Validators.email])],
      addr1: ['',Validators.compose([Validators.required])],
      addr2: ['',Validators.compose([Validators.required])],
      city: ['',Validators.compose([Validators.required])],
      state: ['',Validators.compose([Validators.required])],
      post_code: ['',Validators.compose([Validators.required])],
      country: ['',Validators.compose([Validators.required])],
    })
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('user_info').then(val=>{
      //console.log(val.id)
      this.userId = val.id
      this.authService.getClientProfile(val.id).subscribe(res=>{
        //console.log(res)
        if(res.status == 200){
          this.form.patchValue({
            fname : res.info.first_name,
            lname : res.info.last_name,
            email : res.info.email,
            phone : res.info.phone,
            addr1 : res.info.addr1,
            addr2 : res.info.addr2,
            city : res.info.city,
            state : res.info.state,
            post_code : res.info.post_code,
            country : res.info.country
          })
          if(res.info.image){
            this.img = res.info.image
          }
        }
      })
      
    })
  }

  onSubmit(){
    this.presentLoading('Updating...')
    this.submitAttempt = true
    if(!this.form.valid){
      return
    }else{
      console.log(this.form.value)
      const data ={
        id: this.userId,
        fname:this.form.value.fname,
        lname:this.form.value.lname,
        email:this.form.value.email,
        phone:this.form.value.phone,
        post_code:this.form.value.post_code,
        city:this.form.value.city,
        addr1:this.form.value.addr1,
        addr2:this.form.value.addr2,
        state:this.form.value.state,
        country:this.form.value.country,
        prev_image:this.img,
        image: this.base64img,
      }
      if(this.authService.netConnected){
        this.authService.UpdateClientProfile(data).subscribe(res=>{
          console.log(res)
          if(res.status ==200){
            const user_info = {
              fname: this.form.value.fname,
              lname: this.form.value.lname,
              id: this.userId,
              image: this.img,
            }
            this.storage.set('user_info',user_info).then(()=>{
              this.events.publish('user_info',user_info)
              this.loadingController.dismiss().then(()=>{
                this.presentToast('Profile Updated')
              })
            })  
          }
        })
      }else{
        this.presentToast('No Network Connection!')
      }
    }
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

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentLoading(msg) {
    const loading = await this.loadingController.create({
      // message: 'Hellooo',
      // duration: 2000
      message: msg,
    });
    await loading.present();
  }

}
