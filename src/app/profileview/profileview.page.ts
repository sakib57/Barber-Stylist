import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../services/client.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.page.html',
  styleUrls: ['./profileview.page.scss'],
})
export class ProfileviewPage implements OnInit {
  apiLink=environment.apiLink;
  segment: string;
  myValue:Boolean=false;
  hideMe=true;
  showMe=false;

  fav = false
  form: FormGroup
  submitAttempt = false
  key = 0
  services = []
  reviews = []
  gallery = []
  info = {
    id: '',
    emp_id: '',
    name: '',
    designation: '',
    image: '',
    phone: '',
    addr1: '',
    addr2: '',
    post_code: '',
    sun_start_time: '',
    sun_end_time: '',
    mon_start_time: '',
    mon_end_time: '',
    tue_start_time: '',
    tue_end_time: '',
    wed_start_time: '',
    wed_end_time: '',
    thu_start_time: '',
    thu_end_time: '',
    fri_start_time: '',
    fri_end_time: '',
    sat_start_time: '',
    sat_end_time: '',
  }

  userId = null
  userfName = ''
  userlName = ''
  userImage = ''

  constructor(
    public route: ActivatedRoute,
    public clientService: ClientService,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public storage: Storage,
    public toastController: ToastController
  ) {
      this.segment = "about";
      this.form = formBuilder.group({
        message: ['',Validators.compose([Validators.required])]
      })
  }

  

  hide() {
    this.hideMe=false;
    this.showMe=true;
  }

  show() {
    this.submitAttempt = true
    if(!this.form.valid){
      return
    }else{
      if(this.key < 1){
        this.presentAlert('Please select a star first.')
      }else{
        const data = {
          client_id: this.userId,
          emp_id: this.info.id,
          star: this.key,
          message: this.form.value.message
        }
        console.log(data)
        this.clientService.addReview(data).subscribe(res=>{
          console.log(res)
          if(res.status == 200){
            const add_data = {
              first_name: this.userfName,
              last_name: this.userlName,
              image: this.userImage,
              message: this.form.value.message,
              created_at: new Date(),
              star: this.key
            }
            this.reviews.push(add_data)
            this.key = 0
            this.form.setValue({message:''})
            this.hideMe=true;
            this.showMe=false;
          }
        })
      }
    }
    
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    var id = this.route.snapshot.paramMap.get('id')
    this.storage.get('user_info').then(val=>{
      console.log(val)
      this.userId = val.id
      this.userfName = val.fname
      this.userlName = val.lname
      this.userImage = val.image
      console.log(id+" "+this.userId)
      this.clientService.getBarberProfile(id,this.userId).subscribe(res=>{
        console.log(res)
        if(res.status == 200){
          this.info.id = res.info.id
          this.info.emp_id = res.info.emp_id
          this.info.name = res.info.first_name+" "+res.info.last_name
          this.info.designation = res.info.designation
          this.info.addr1 = res.info.addr1
          this.info.addr2 = res.info.addr2
          this.info.phone = res.info.phone
          this.info.image = res.info.image
          this.info.post_code = res.info.post_code
          this.info.mon_start_time = res.info.mon_start_time
          this.info.mon_end_time = res.info.mon_end_time
          this.info.tue_start_time = res.info.tue_start_time
          this.info.tue_end_time = res.info.tue_end_time
          this.info.wed_start_time = res.info.wed_start_time
          this.info.wed_end_time = res.info.wed_end_time
          this.info.thu_start_time = res.info.thu_start_time
          this.info.thu_end_time = res.info.thu_end_time
          this.info.fri_start_time = res.info.fri_start_time
          this.info.fri_end_time = res.info.fri_end_time
          this.info.sat_start_time = res.info.sat_start_time
          this.info.sat_end_time = res.info.sat_end_time
          this.info.sun_start_time = res.info.sun_start_time
          this.info.sun_end_time = res.info.sun_end_time
          
          this.services = res.service
          this.reviews = res.reviews

          this.gallery = res.gallery
  
          for(let i=0;i<res.favs.length;i++){
            if(res.favs[i]['emp_id'] == id){
              //console.log('favorit')
              this.fav = true
              break
            }
          }
        }
      })
    })
    
  }

  srtStar(key){
    console.log(key)
    this.key = key
  }

  // For Barber or Stylist
  makeFav(emp_id){
    console.log('make fav: '+emp_id)
    this.clientService.makeFav(emp_id,this.userId).subscribe(res=>{
      if(res.status == 200){
        this.fav = true
        this.presentToast('Barber/Stylist added to favorite')
      }
    })
  }
  rmvFav(emp_id){
    console.log('rmv fav: '+emp_id)
    this.clientService.rmvFav(emp_id,this.userId).subscribe(res=>{
      if(res.status == 200){
        this.fav = false
        this.presentToast('Barber/Stylist removed from favorite')
      }
    })
  }
  //End

  // For Style Image
  makeFavStyle(id){
    console.log(id)
    this.clientService.makeFavStyle(id,this.userId).subscribe(res=>{
      console.log(res)
      if(res.status == 200){
        for(let i = 0; i< this.gallery.length; i++){
          if(this.gallery[i]['id'] == id){
            this.gallery[i]['fav_id'] = res.fav_id
          }
        }
        this.presentToast('Style added to favorite')
      }
    })
  }
  rmvFavStyle(fav_id){
    console.log(fav_id)
    this.clientService.rmvFavStyle(fav_id).subscribe(res=>{
      console.log(res)
      for(let i = 0; i< this.gallery.length; i++){
        if(this.gallery[i]['fav_id'] == fav_id){
          this.gallery[i]['fav_id'] = null
        }
      }
      this.presentToast('Style removed from favorite')
    })
  }




  //End

  async presentAlert(msg) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
