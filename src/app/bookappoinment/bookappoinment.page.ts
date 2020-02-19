import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { BarberService } from '../services/barber.service';
import { ClientService } from '../services/client.service';
import { ToastController, AlertController } from '@ionic/angular';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-bookappoinment',
  templateUrl: './bookappoinment.page.html',
  styleUrls: ['./bookappoinment.page.scss'],
})
export class BookappoinmentPage implements OnInit {

  apiLink=environment.apiLink;
  userId = null
  barberId = null
  checkedService = []
  schedule = []
  totalPrice = 0
  totalHour = 0
  finalTime = ''
  bookingStartTime = ''
  bookingEndTime = ''
  bookingDate = ''

  barber_info = {
    fname: '',
    lname: '',
    id: null,
    image: '',
    sun_open: '',
    mon_open: '',
    tue_open: '',
    wed_open: '',
    thu_open: '',
    fri_open: '',
    sat_open: '',
    service: [],
    gallery: []
  }

  public calendar = {
    mode: 'week',
    currentDate: new Date()
  };

  markDisabled = (date: Date) => {
    var current = new Date();
    return date < current;
  };


  title = ''
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public storage: Storage,
    public barberService: BarberService,
    public clientService: ClientService,
    public authService: AuthServiceService,
    public toastController: ToastController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('user_info').then(val=>{
      this.userId = val.id
    })
    this.barberId = this.route.snapshot.paramMap.get('id')
    //console.log(this.barberId)
    this.barberService.getBookingInfo(this.barberId,this.userId).subscribe(res=>{
      //console.log(res)
      this.barber_info.fname = res.info.first_name
      this.barber_info.lname = res.info.last_name
      this.barber_info.image = res.info.image
      this.barber_info.service = res.service
      this.barber_info.gallery = res.gallery
      this.barber_info.sun_open = res.info.sun_open
      this.barber_info.mon_open = res.info.mon_open
      this.barber_info.tue_open = res.info.tue_open
      this.barber_info.wed_open = res.info.wed_open
      this.barber_info.thu_open = res.info.thu_open
      this.barber_info.fri_open = res.info.fri_open
      this.barber_info.sat_open = res.info.sat_open
    })
  }

  minute_cal(str){
    var n = str.indexOf("hour");
    var m = str.indexOf("hours");
    //console.log(n)
    if(n == -1  && m == -1){
      var arr = str.split('hour');
      var minutes = arr[0].match(/\d+/g);
      return +minutes
    }else{
      var arr = str.split('hour');
      var hour = arr[0].match(/\d+/g);
      var minutes = arr[1].match(/\d+/g);
      var total_minutes = (+hour*60) + +minutes
      return total_minutes
    }
  }

  makeTime(num:number){
    var hour = num/60
    var minute = num%60
    var floor_hr = Math.floor(hour)
    if(floor_hr > 1 && minute > 0){
      return floor_hr+' hours '+minute+' minutes'
    }else if(floor_hr > 1 && minute == 0){
      return floor_hr+' hours '
    }else if(floor_hr < 1){
      return minute+' minutes'
    }else if(floor_hr == 1 && minute == 0){
      return floor_hr+' hour '
    }else{
      return floor_hr+' hour '+minute+' minutes'
    }
    
  }
  check(e,id,price,duration){
    this.schedule = []
    this.bookingStartTime = ''
    if(e.detail.checked){
      
      this.checkedService.push(id)
      this.totalPrice += +price
      this.totalHour += this.minute_cal(duration)
      this.finalTime = this.makeTime(this.totalHour)
    }else{
      this.checkedService.splice( this.checkedService.indexOf(id), 1 );
      this.totalPrice -= +price
      this.totalHour -= this.minute_cal(duration)
      this.finalTime = this.makeTime(this.totalHour)
    }
    console.log(this.checkedService)
  }

  onCurrentDateChanged(e){
    
    const date = new Date(e)
    const current = new Date()
    //var current_date = new Date(current.getTime() - 5*60000);

    // if(current_date > e){
    //   console.log(typeof e+' '+typeof current_date)
    //   this.presentAlert('Please select upcoming date')
    //   return;
    // }
    //console.log(date)
    let yr = date.getFullYear()
    let mn
    let dy
    let m = date.getMonth()+1
    let d = date.getDate()
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
    this.bookingDate = yr+'-'+mn+'-'+dy
    //let d = date.getDate()
    const data = {
      barber_id: this.barberId,
      date: this.bookingDate,
      day: e.getDay(),
      diff: this.finalTime
    }
    var day = e.getDay()
    if(day == 0){
      if(this.barber_info.sun_open == '1'){
        if(this.totalPrice == 0){
          this.presentAlert('Please select a service first')
        }else{
          this.findSchedule(data)
        }
      }else{
        this.schedule = []
        this.presentToast('We are off this day')
      }
    }
    if(day == 1){
      if(this.barber_info.mon_open == '1'){
        if(this.totalPrice == 0){
          this.presentAlert('Please select a service first')
        }else{
          this.findSchedule(data)
        }
      }else{
        this.schedule = []
        this.presentToast('We are off this day')
      }
    }
    if(day == 2){
      if(this.barber_info.tue_open == '1'){
        if(this.totalPrice == 0){
          this.presentAlert('Please select a service first')
        }else{
          this.findSchedule(data)
        }
      }else{
        this.schedule = []
        this.presentToast('We are off this day')
      }
    }
    if(day == 3){
      if(this.barber_info.wed_open == '1'){
        if(this.totalPrice == 0){
          this.presentAlert('Please select a service first')
        }else{
          this.findSchedule(data)
        }
      }else{
        this.schedule = []
        this.presentToast('We are off this day')
      }
    }
    if(day == 4){
      if(this.barber_info.thu_open == '1'){
        if(this.totalPrice == 0){
          this.presentAlert('Please select a service first')
        }else{
          this.findSchedule(data)
        }
      }else{
        this.schedule = []
        this.presentToast('We are off this day')
      }
    }
    if(day == 5){
      if(this.barber_info.fri_open == '1'){
        if(this.totalPrice == 0){
          this.presentAlert('Please select a service first')
        }else{
          this.findSchedule(data)
        }
      }else{
        this.schedule = []
        this.presentToast('We are off this day')
      }
    }
    if(day == 6){
      if(this.barber_info.sat_open == '1'){
        if(this.totalPrice == 0){
          this.presentAlert('Please select a service first')
        }else{
          this.findSchedule(data)
        }
      }else{
        this.schedule = []
        this.presentToast('We are off this day')
      }
    }
    
    
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

  findSchedule(data){
    if(this.authService.netConnected){
      this.clientService.getBookingSchedule(data).subscribe(res=>{
        if(res.status == 200){
          this.schedule = res.slots
          for(let i = 0; i< res.slots.length; i++){
            this.schedule[i]['is_booked'] = res.slots[i]['is_booked']
            this.schedule[i]['time'] = new Date('2020-04-11T'+res.slots[i]['s_time']+':30')
          }
          console.log(this.schedule)
        }else{
          this.schedule = []
        }
      })
    }else{
      this.presentToast('No Network Connection!')
    }
  }

  selectSlot(s_time,e_time){
    console.log(s_time+' '+e_time)
    this.bookingStartTime = '2020-02-12 '+s_time+':00'
    this.bookingEndTime = '2020-02-12 '+e_time+':00'
  }

  makeBooking(){
    if(this.bookingStartTime != ''){
      const data = {
        userId: this.userId,
        empId: this.barberId,
        st_time: this.bookingStartTime,
        en_time: this.bookingEndTime,
        total_price: this.totalPrice,
        services: this.checkedService,
        date: this.bookingDate,
        date_check: this.bookingDate+' '+(this.bookingStartTime).substring( 11, 19),
      }
      console.log(data)
      if(this.authService.netConnected){
        this.clientService.makeBooking(data).subscribe(res=>{
          console.log(res)
          if(res.status == 200){
            this.router.navigateByUrl('/home/ctabs/myappointments')
          }
        })
      }else{
        this.presentToast('No Network Connected!')
      }
    }else{
      this.presentAlert('Please select a time slot')
    }
  }

 
  
  // Change current month/week/day
  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }
 
  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

}
