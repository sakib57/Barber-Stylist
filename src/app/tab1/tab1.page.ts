import { Component } from '@angular/core';
import { BarberService } from '../services/barber.service';
import { Storage } from '@ionic/storage';
import { Events, ActionSheetController } from '@ionic/angular';


import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  apiLink=environment.apiLink;
  active = 'info'
  services = []
  galleries = []
  fav_stylist = []
  bookings = []
  reviews = []
  base64img ='';
  errMsg = ''
  
  satOpen = false
  sunOpen = false
  monOpen = false
  tueOpen = false
  wedOpen = false
  thuOpen = false
  friOpen = false

  userInfo = {
    name: '',
    image: '',
    shopName: '',
    addr1: '',
    addr2: '',
    sun_st: new Date(),
    sun_en: new Date(),
    mon_st: new Date(),
    mon_en: new Date(),
    tue_st: new Date(),
    tue_en: new Date(),
    wed_st: new Date(),
    wed_en: new Date(),
    thu_st: new Date(),
    thu_en: new Date(),
    fri_st: new Date(),
    fri_en: new Date(),
    sat_st: new Date(),
    sat_en: new Date(),
  }
  constructor(
    public storage: Storage,
    public barberService: BarberService,
    public events: Events,
    public actionSheetCtrl:ActionSheetController,
    public camera: Camera,
  ) { }
  segmentChanged(event){
    this.active=event.detail.value
  }

  ionViewWillEnter(){
    // Get event vlaue from create page
    this.events.subscribe('data', (data) => {
      //console.log(data);
      this.services.push(data)
    });

    this.events.subscribe('barber_info',val=>{
      //console.log(val)
      this.userInfo.shopName = val.shop_name
      this.userInfo.addr1 = val.addr1
      this.userInfo.addr2 = val.addr2
      this.sunOpen = true ? val.sunOpen == '1' : false
      this.userInfo.sun_st = val.sunSt
      this.userInfo.sun_en = val.sunEn
      this.monOpen = true ? val.monOpen == '1' : false
      this.userInfo.mon_st = val.monSt
      this.userInfo.mon_en = val.monEn
      this.tueOpen = true ? val.tueOpen == '1' : false
      this.userInfo.tue_st = val.tueSt
      this.userInfo.tue_en = val.tueEn
      this.wedOpen = true ? val.wedOpen == '1' : false
      this.userInfo.wed_st = val.wedSt
      this.userInfo.wed_en = val.wedEn
      this.thuOpen = true ? val.thuOpen == '1' : false
      this.userInfo.thu_st = val.thuSt
      this.userInfo.thu_en = val.thuEn
      this.friOpen = true ? val.friOpen == '1' : false
      this.userInfo.fri_st = val.friSt
      this.userInfo.fri_en = val.friEn
      this.sunOpen = true ? val.sunOpen == '1' : false
      this.userInfo.sun_st = val.sunSt
      this.userInfo.sun_en = val.sunEn
    })
    this.storage.get('user_info').then(val=>{
      this.userInfo.name = val.fname+' '+val.lname
      this.userInfo.image = val.image
      //Api call for get barber home page
      this.barberService.getMyHomepageInfo(val.id).subscribe(res=>{
        console.log(res)
        if(res.status == 200){
          this.userInfo.shopName = res.info.shop_name
          this.userInfo.addr1 = res.info.addr1
          this.userInfo.addr2 = res.info.addr2
          if(res.service.length > 0){
            this.services = res.service
          }
          if(res.reviews.length > 0){
            this.reviews = res.reviews
          }
          if(res.gallery.length > 0){
            this.galleries = res.gallery
          }
          if(res.schedule != null){
            if(res.schedule.sun_open == '1'){
              this.sunOpen = true
            }
            if(res.schedule.sun_start_time){
              this.userInfo.sun_st = new Date(res.schedule.sun_start_time)
            }
            if(res.schedule.sun_end_time){
              this.userInfo.sun_en = new Date(res.schedule.sun_end_time)
            }

            if(res.schedule.mon_open == '1'){
              this.monOpen = true
            }
            if(res.schedule.mon_start_time){
              this.userInfo.mon_st = new Date(res.schedule.mon_start_time)
            }
            if(res.schedule.mon_end_time){
              this.userInfo.mon_en = new Date(res.schedule.mon_end_time)
            }

            if(res.schedule.tue_open == '1'){
              this.tueOpen = true
            }
            if(res.schedule.tue_start_time){
              this.userInfo.tue_st = new Date(res.schedule.tue_start_time)
            }
            if(res.schedule.tue_end_time){
              this.userInfo.tue_en = new Date(res.schedule.tue_end_time)
            }

            if(res.schedule.wed_open == '1'){
              this.wedOpen = true
            }
            if(res.schedule.wed_start_time){
              this.userInfo.wed_st = new Date(res.schedule.wed_start_time)
            }
            if(res.schedule.wed_end_time){
              this.userInfo.wed_en = new Date(res.schedule.wed_end_time)
            }

            if(res.schedule.thu_open == '1'){
              this.thuOpen = true
            }
            if(res.schedule.thu_start_time){
              this.userInfo.thu_st = new Date(res.schedule.thu_start_time)
            }
            if(res.schedule.thu_end_time){
              this.userInfo.thu_en = new Date(res.schedule.thu_end_time)
            }

            if(res.schedule.fri_open == '1'){
              this.friOpen = true
            }
            if(res.schedule.fri_start_time){
              this.userInfo.fri_st = new Date(res.schedule.fri_start_time)
            }
            if(res.schedule.fri_end_time){
              this.userInfo.fri_en = new Date(res.schedule.fri_end_time)
            }

            if(res.schedule.sat_open == '1'){
              this.satOpen = true
            }
            if(res.schedule.sat_start_time){
              this.userInfo.sat_st = new Date(res.schedule.sat_start_time)
            }
            if(res.schedule.sat_end_time){
              this.userInfo.sat_en = new Date(res.schedule.sat_end_time)
            }
            
            
          } 
        }
      })
      

    })
    
  }



  
}
