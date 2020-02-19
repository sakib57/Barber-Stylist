import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ClientService } from '../services/client.service';
import { environment } from 'src/environments/environment';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-myfav',
  templateUrl: './myfav.page.html',
  styleUrls: ['./myfav.page.scss'],
})
export class MyfavPage implements OnInit {

  userInfo = {
    name: '',
    id: null
  }
  apiLink=environment.apiLink;
  stylists = []
  gallery = []
  constructor(
    public storage: Storage,
    public clientService: ClientService,
    public alertController: AlertController,
    public authService: AuthServiceService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.storage.get('user_info').then(val=>{
      //console.log(val)
      //this.userId = val.id
      this.userInfo.name = val.fname+' '+val.lname
      this.userInfo.id = val.id
      this.clientService.getMyFavs(val.id).subscribe(res=>{
        console.log(res)
        this.stylists = res.data
        this.gallery = res.gallery
      })
    })
  }

  
  async removeStylist(id,index) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Really want to remove?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Remove',
          handler: () => {
            console.log(id," ",index)
            if(this.authService.netConnected){
              this.clientService.removeMyFav(id).subscribe(res=>{
                console.log(res)
                if(res.status == 200){
                  this.stylists.splice(index, 1); 
                }
              })
            }else{
              this.presentToast('No Network Connection!')
            }
          }
        }
      ]
    });

    await alert.present();
  }

  
  async removeGallery(id,index) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Really want to remove?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Remove',
          handler: () => {
            console.log(id," ",index)
            if(this.authService.netConnected){
              this.clientService.removeMyGallery(id).subscribe(res=>{
                console.log(res)
                if(res.status == 200){
                  this.gallery.splice(index, 1); 
                }
              })
            }else{
              this.presentToast('No Network Connection!')
            }
          }
        }
      ]
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
