import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { ToastController, ActionSheetController, LoadingController } from '@ionic/angular';

//import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
//import { ClientService } from '../services/client.service';
import { BarberService } from '../services/barber.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  //apiLink=environment.apiLink;
  // base64img = ''
  // submitAttempt = false
  // img = 'assets/images/kohli.jpg'

  title = ''
  segment = 'requested'
  data = []
  confirmed = []
  canceled = []
  form: FormGroup
  public calendar = {
    mode: 'week',
    currentDate: new Date()
  };
  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public authService: AuthServiceService,
    public barberService: BarberService,
    public storage: Storage,
    public toastController: ToastController,
    public loadingController: LoadingController,
    //public camera: Camera,
    public actionSheetCtrl: ActionSheetController

  ) {
    this.form = formBuilder.group({
      email: ['',Validators.compose([Validators.required,Validators.email])],
      fname: ['',Validators.compose([Validators.required])],
      lname: ['',Validators.compose([Validators.required])]
    })
  }

  ionViewWillEnter(){
    this.storage.get('user_info').then(val=>{
      
    })
  }

  onCurrentDateChanged(e){
    console.log(e)
    // const date = new Date(e)
    // const current = new Date()
    //var current_date = new Date(current.getTime() - 5*60000);

    // if(current_date > e){
    //   console.log(typeof e+' '+typeof current_date)
    //   this.presentAlert('Please select upcoming date')
    //   return;
    // }
    //console.log(date)
    let yr = e.getFullYear()
    let mn
    let dy
    let m = e.getMonth()+1
    let d = e.getDate()
    if( m< 10){
      mn = '0'+m
    }else{
      mn = m
    }

    if(d<10){
      dy = '0'+d
    }else{
      dy = d
    }
    const bookingDate = yr+'-'+mn+'-'+dy
    this.storage.get('user_info').then(val=>{
      this.barberService.getMyBooking(val.id,bookingDate).subscribe(res=>{
        console.log(res)
        if(res.status == 200){
          for(let i =0; i < res.data.length; i++){
            res.data[i]['date'] = new Date(res.data[i]['date'])
            res.data[i]['schedule_start'] = new Date(res.data[i]['schedule_start'])
          }
          this.data = res.data

          for(let i =0; i < res.confirmed.length; i++){
            res.confirmed[i]['date'] = new Date(res.confirmed[i]['date'])
            res.confirmed[i]['schedule_start'] = new Date(res.confirmed[i]['schedule_start'])
          }
          this.confirmed = res.data
        }
      })
    })
    
    // //let d = date.getDate()
    // const data = {
    //   barber_id: this.barberId,
    //   date: this.bookingDate,
    //   day: e.getDay(),
    //   diff: this.finalTime
    // }
    // var day = e.getDay()
    // if(day == 0){
    //   if(this.barber_info.sun_open == '1'){
    //     if(this.totalPrice == 0){
    //       this.presentAlert('Please select a service first')
    //     }else{
    //       this.findSchedule(data)
    //     }
    //   }else{
    //     this.schedule = []
    //     this.presentToast('We are off this day')
    //   }
    // }
    // if(day == 1){
    //   if(this.barber_info.mon_open == '1'){
    //     if(this.totalPrice == 0){
    //       this.presentAlert('Please select a service first')
    //     }else{
    //       this.findSchedule(data)
    //     }
    //   }else{
    //     this.schedule = []
    //     this.presentToast('We are off this day')
    //   }
    // }
    // if(day == 2){
    //   if(this.barber_info.tue_open == '1'){
    //     if(this.totalPrice == 0){
    //       this.presentAlert('Please select a service first')
    //     }else{
    //       this.findSchedule(data)
    //     }
    //   }else{
    //     this.schedule = []
    //     this.presentToast('We are off this day')
    //   }
    // }
    // if(day == 3){
    //   if(this.barber_info.wed_open == '1'){
    //     if(this.totalPrice == 0){
    //       this.presentAlert('Please select a service first')
    //     }else{
    //       this.findSchedule(data)
    //     }
    //   }else{
    //     this.schedule = []
    //     this.presentToast('We are off this day')
    //   }
    // }
    // if(day == 4){
    //   if(this.barber_info.thu_open == '1'){
    //     if(this.totalPrice == 0){
    //       this.presentAlert('Please select a service first')
    //     }else{
    //       this.findSchedule(data)
    //     }
    //   }else{
    //     this.schedule = []
    //     this.presentToast('We are off this day')
    //   }
    // }
    // if(day == 5){
    //   if(this.barber_info.fri_open == '1'){
    //     if(this.totalPrice == 0){
    //       this.presentAlert('Please select a service first')
    //     }else{
    //       this.findSchedule(data)
    //     }
    //   }else{
    //     this.schedule = []
    //     this.presentToast('We are off this day')
    //   }
    // }
    // if(day == 6){
    //   if(this.barber_info.sat_open == '1'){
    //     if(this.totalPrice == 0){
    //       this.presentAlert('Please select a service first')
    //     }else{
    //       this.findSchedule(data)
    //     }
    //   }else{
    //     this.schedule = []
    //     this.presentToast('We are off this day')
    //   }
    // }
    
    
  }
  reloadSource(e){
    //console.log(startTime,endTime)
  }
  onEventSelected(e){
    //console.log(e)
  }
  onViewTitleChanged(e){
    console.log(e)
    var title = e.split(',')
    this.title = title[0]
  }
  onTimeSelected(e){
    //console.log(e)
  }

  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }
 
  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  confirm(bookingId,index){
    this.presentLoading('Confirming...')
    //console.log('confirmed '+bookingId)
    if(this.authService.netConnected){
      this.barberService.confirm(bookingId).subscribe(res=>{
        console.log(res)
        if(res.status == 200){
          this.loadingController.dismiss().then(()=>{
            this.confirmed.push(this.data[index])
            this.data.splice(index,1)
          })
        }
      })
    }else{
      this.presentToast('No Network Connection!')
    }
    
  }

  cancel(bookingId,index){
    this.presentLoading('Canceling...')
    //console.log('canceled '+bookingId)
    if(this.authService.netConnected){
      this.barberService.cancel(bookingId).subscribe(res=>{
        console.log(res)
        if(res.status == 200){
          this.loadingController.dismiss().then(()=>{
            this.canceled.push(this.data[index])
            this.data.splice(index,1)
          })
        }
      })
    }else{
      this.presentToast('No Network Connection!')
    }
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
      message: msg,
      duration: 2000
    });
    await loading.present();
  }

}
