import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { BarberService } from '../services/barber.service';
import { ToastController, Events } from '@ionic/angular';

@Component({
  selector: 'app-edit-barber-info',
  templateUrl: './edit-barber-info.page.html',
  styleUrls: ['./edit-barber-info.page.scss'],
})
export class EditBarberInfoPage implements OnInit {

  form: FormGroup
  submitAttempt = false

  sunSw = false
  sunOpen = ''
  sunClose = ''
  monSw = false
  monOpen = ''
  monClose = ''
  tueSw = false
  tueOpen = ''
  tueClose = ''
  wedSw = false
  wedOpen = ''
  wedClose = ''
  thuSw = false
  thuOpen = ''
  thuClose = ''
  friSw = false
  friOpen = ''
  friClose = ''
  satSw = false
  satOpen = ''
  satClose = ''

  shop_name = ''
  addr1 = ''
  addr2 = ''
  city = ''
  state = ''
  post_code = ''
  country = ''

  user_info = {
    id: null,
    name: ''
  }

  constructor(
    public router: Router,
    public barberService: BarberService,
    public storage: Storage,
    public toastController: ToastController,
    public events: Events
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('user_info').then(val=>{
      this.user_info.id = val.id,
      this.user_info.name = val.fname+' '+val.lname

      this.barberService.getEditLocationInfo(val.id).subscribe(res=>{
        console.log(res)
        if(res.status == 200){
          this.shop_name = res.info.shop_name
          this.addr1 = res.info.addr1
          this.addr2 = res.info.addr2
          this.city = res.info.city
          this.state = res.info.state
          this.post_code = res.info.post_code
          this.country = res.info.country
          if(res.schedule.sun_open == '1'){
            this.sunSw = true
            this.sunOpen = res.schedule.sun_start_time
            this.sunClose = res.schedule.sun_end_time
          }
          if(res.schedule.mon_open == '1'){
            this.monSw = true
            this.monOpen = res.schedule.mon_start_time
            this.monClose = res.schedule.mon_end_time
          }
          if(res.schedule.tue_open == '1'){
            this.tueSw = true
            this.tueOpen = res.schedule.tue_start_time
            this.tueClose = res.schedule.tue_end_time
          }
          if(res.schedule.wed_open == '1'){
            this.wedSw = true
            this.wedOpen = res.schedule.wed_start_time
            this.wedClose = res.schedule.wed_end_time
          }
          if(res.schedule.thu_open == '1'){
            this.thuSw = true
            this.thuOpen = res.schedule.thu_start_time
            this.thuClose = res.schedule.thu_end_time
          }
          if(res.schedule.fri_open == '1'){
            this.friSw = true
            this.friOpen = res.schedule.fri_start_time
            this.friClose = res.schedule.fri_end_time
          }
          if(res.schedule.sat_open == '1'){
            this.satSw = true
            this.satOpen = res.schedule.sat_start_time
            this.satClose = res.schedule.sat_end_time
          }
        }
      })
    })
    
  }

  onSubmit(form){
    this.submitAttempt = true
    const info = {
      emp_id: this.user_info.id,
      shop_name: this.shop_name,
      addr1: this.addr1,
      addr2: this.addr2,
      city: this.city,
      state: this.state,
      post_code: this.post_code,
      country: this.country,
      //Schedule
      sunOpen: this.sunSw ? '1' : '0',
      sunSt: this.sunOpen,
      sunEn: this.sunClose,
      monOpen: this.monSw ? '1' : '0',
      monSt: this.monOpen,
      monEn: this.monClose,
      tueOpen: this.tueSw ? '1' : '0',
      tueSt: this.tueOpen,
      tueEn: this.tueClose,
      wedOpen: this.wedSw ? '1' : '0',
      wedSt: this.wedOpen,
      wedEn: this.wedClose,
      thuOpen: this.thuSw ? '1' : '0',
      thuSt: this.thuOpen,
      thuEn: this.thuClose,
      friOpen: this.friSw ? '1' : '0',
      friSt: this.friOpen,
      friEn: this.friClose,
      satOpen: this.satSw ? '1' : '0',
      satSt: this.satOpen,
      satEn: this.satClose,
    }
    //console.log(info)
    this.barberService.updateBarberInfo(info).subscribe(res=>{
      console.log(res)
      if(res.status == 200){
        this.events.publish('barber_info',info)
        this.presentToast('Info updeted successfully!')
      }
    })
  }

  sunSwitch(e){
    this.sunSw = e.detail.checked
    
  }
  monSwitch(e){
    this.monSw = e.detail.checked
    
  }
  tueSwitch(e){
    this.tueSw = e.detail.checked
    
  }
  wedSwitch(e){
    this.wedSw = e.detail.checked
    
  }
  thuSwitch(e){
    this.thuSw = e.detail.checked
    
  }
  friSwitch(e){
    this.friSw = e.detail.checked
    
  }
  satSwitch(e){
    this.satSw = e.detail.checked
    
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present().then(()=>{
      this.router.navigateByUrl('/home2/tabs/tab1')
    })
  }
}
