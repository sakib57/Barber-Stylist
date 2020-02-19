import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ClientService } from '../services/client.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-myappointments',
  templateUrl: './myappointments.page.html',
  styleUrls: ['./myappointments.page.scss'],
})
export class MyappointmentsPage implements OnInit {
  segment: string;

  userId = null

  upComingBooking = []
  pastBooking = []
  constructor(
    public storage: Storage,
    public clientService: ClientService,
    public authService: AuthServiceService,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {     
     this.segment = "upcoming";
 
   }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.storage.get('user_info').then(val=>{
      console.log(val)
      this.userId = val.id
      this.clientService.getMyBooking(val.id).subscribe(res=>{
        console.log(res)

        this.upComingBooking = res.upcoming
        for(let i = 0; i < this.upComingBooking.length; i++){
          this.upComingBooking[i]['schedule_start'] = new Date(this.upComingBooking[i]['schedule_start'])
          this.upComingBooking[i]['date'] = new Date(this.upComingBooking[i]['date'])
        }

        this.pastBooking = res.past
        for(let i = 0; i < this.pastBooking.length; i++){
          this.pastBooking[i]['schedule_start'] = new Date(this.pastBooking[i]['schedule_start'])
          this.pastBooking[i]['date'] = new Date(this.pastBooking[i]['date'])
        }
        //console.log(this.upComingBooking)
      })
    })
  }

  confirm(bookingId,index){
    //this.upComingBooking.splice(index,1)
    this.presentLoading('Confirming...')
    if(this.authService.netConnected){
      this.clientService.bookingConfirm(bookingId).subscribe(res=>{
        console.log(res)
        if(res.status == 200){
          this.loadingController.dismiss().then(()=>{
            this.upComingBooking.splice(index,1)
            this.presentToast('Booking confirmed!')
          })
        }
      })
    }else{
      this.presentToast('No Network Connection!')
    }
  }


  cancel(bookingId,index){
    this.presentLoading('Canceling...')
    if(this.authService.netConnected){
      this.clientService.bookingCancel(bookingId).subscribe(res=>{
        console.log(res)
        if(res.status == 200){
          this.loadingController.dismiss().then(()=>{
            this.upComingBooking.splice(index,1)
            this.presentToast('Booking canceled!')
          })
        }
      })
    }else{
      this.presentToast('No Network Connection!')
    }
  }

  async presentLoading(msg) {
    const loading = await this.loadingController.create({
      message: msg,
      duration: 2000
    });
    await loading.present();
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
