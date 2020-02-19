import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController, ToastController} from '@ionic/angular';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  form: FormGroup
  barber = false
  stylist = false
  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public clientService: ClientService,
    public storage: Storage,
    public alertController: AlertController,
    public loadingController: LoadingController,
    public authService: AuthServiceService,
    public toastController: ToastController
  ) {
    this.form = formBuilder.group({
      barber: [''],
      stylist: [''],
      zip: [''],
    })
  }

  barberCheck(e){
    if(e.detail.checked){
      this.barber = true
    }else{
      this.barber = false
    }
  }
  stylistCheck(e){
    if(e.detail.checked){
      this.stylist = true
    }else{
      this.stylist = false
    }
  }
  ngOnInit() {
  }

  onSubmit(){
    
    if(!this.barber && !this.stylist){
      this.presentAlert('Please select barber or stylist or both')
    }else if(this.barber && !this.stylist && this.form.value.zip == ''){
      if(this.authService.netConnected){
        this.presentLoading('Searching..')
        //console.log('all barber')
        this.clientService.findBarber(1,null,null).subscribe(res=>{
          console.log(res)
          if(res.status == 200){
            //this.events.publish('found_data',JSON.stringify(res.data))
            this.storage.set('found_data',JSON.stringify(res.data)).then(()=>{
              this.loadingController.dismiss().then(()=>{
                this.router.navigateByUrl('/home/ctabs/serachresult')
              })
            })
          }else{
            this.loadingController.dismiss().then(()=>{
              this.presentAlert('No data found')
            })
          }
        })
      }else{
        this.presentToast('No Network Connection!')
      }
    }else if(this.barber && !this.stylist && this.form.value.zip != ''){
      if(this.authService.netConnected){
        this.presentLoading('Searching..')
        //console.log('barber with zip')
        this.clientService.findBarber(1,null,this.form.value.zip).subscribe(res=>{
          //console.log(res)
          if(res.status == 200){
            this.storage.set('found_data',JSON.stringify(res.data)).then(()=>{
              this.loadingController.dismiss().then(()=>{
                this.router.navigateByUrl('/home/ctabs/serachresult')
              })
            })
          }else{
            this.loadingController.dismiss().then(()=>{
              this.presentAlert('No data found')
            })
          }
        })
      }else{
        this.presentToast('No Network Connection!')
      }
    }else if(!this.barber && this.stylist && this.form.value.zip == ''){
      if(this.authService.netConnected){
        this.presentLoading('Searching..')
        //console.log('all stylist')
        this.clientService.findBarber(null,1,null).subscribe(res=>{
          console.log(res)
          if(res.status == 200){
            this.storage.set('found_data',JSON.stringify(res.data)).then(()=>{
              this.loadingController.dismiss().then(()=>{
                this.router.navigateByUrl('/home/ctabs/serachresult')
              })
            })
          }else{
            this.loadingController.dismiss().then(()=>{
              this.presentAlert('No data found')
            })
          }
        })
      }else{
        this.presentToast('No Network Connection!')
      }
    }else if(!this.barber && this.stylist && this.form.value.zip != ''){
      if(this.authService.netConnected){
        this.presentLoading('Searching..')
        //console.log('stylist with zip')
        this.clientService.findBarber(null,1,this.form.value.zip).subscribe(res=>{
          //console.log(res)
          if(res.status == 200){
            this.storage.set('found_data',JSON.stringify(res.data)).then(()=>{
              this.loadingController.dismiss().then(()=>{
                this.router.navigateByUrl('/home/ctabs/serachresult')
              })
            })
          }else{
            this.loadingController.dismiss().then(()=>{
              this.presentAlert('No data found')
            })
          }
        })
      }else{
        this.presentToast('No Network Connection!')
      }
    }else if(this.barber && this.stylist && this.form.value.zip == '' ){
      if(this.authService.netConnected){
        this.presentLoading('Searching..')
        //console.log('all barber and stylist')
        this.clientService.findBarber(1,1,null).subscribe(res=>{
          //console.log(res)
          if(res.status == 200){
            this.storage.set('found_data',JSON.stringify(res.data)).then(()=>{
              this.loadingController.dismiss().then(()=>{
                this.router.navigateByUrl('/home/ctabs/serachresult')
              })
            })
          }else{
            this.loadingController.dismiss().then(()=>{
              this.presentAlert('No data found')
            })
          }
        })
      }else{
        this.presentToast('No Network Connection!')
      }
    }else{
      if(this.authService.netConnected){
        this.presentLoading('Searching..')
        //console.log('barber and stylist with zip')
        this.clientService.findBarber(1,1,this.form.value.zip).subscribe(res=>{
          //console.log(res)
          if(res.status == 200){
            this.storage.set('found_data',JSON.stringify(res.data)).then(()=>{
              this.loadingController.dismiss().then(()=>{
                this.router.navigateByUrl('/home/ctabs/serachresult')
              })
            })
          }else{
            this.loadingController.dismiss().then(()=>{
              this.presentAlert('No data found')
            })
          }
        })
      }else{
        this.presentToast('No Network Connection!')
      }
    }
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
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
