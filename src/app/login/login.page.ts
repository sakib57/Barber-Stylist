import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { Storage } from '@ionic/storage';
import { Events, LoadingController, AlertController, ToastController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup
  submitAttempt = false
  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public authService: AuthServiceService,
    public storage: Storage,
    public events: Events,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public toastController: ToastController
    
  ) {
    this.form = formBuilder.group({
      username: ['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9]*$'),Validators.minLength(3)])],
      password: ['',Validators.compose([Validators.required,Validators.minLength(6)])],
    })
  }

  ngOnInit() {
  }

  onSubmit(){
    this.submitAttempt= true
    if(!this.form.valid){
      return
    }else{
      const data = {
        username: this.form.value.username,
        password: this.form.value.password,
      }
      if(this.authService.netConnected){
        this.presentLoading('Logging In...')
        this.authService.login(data).subscribe(res=>{
          console.log(res)
          if(res.status == 200){
            const user_info = {
              fname: res.data.first_name,
              lname: res.data.last_name,
              id: res.data.id,
              image: res.data.image,
            }
            if(res.type == 'client'){
              this.storage.set('user_info',user_info).then(()=>{
                this.events.publish('user_info',user_info)
                this.loadingController.dismiss().then(()=>{
                  this.router.navigateByUrl('/home/ctabs/tab1')
                })
                
              })
            }else{
              this.storage.set('user_info',user_info).then(()=>{
                this.events.publish('user_info',user_info)
                this.loadingController.dismiss().then(()=>{
                  this.router.navigateByUrl('/home2/tabs/tab1')
                })
                
              })
            }
          }else if(res.status == 404){
            this.loadingController.dismiss().then(()=>{
              this.presentAlert('User or Password Missmatch')
            })
          }
          
        })
      }else{
        this.presentToast('No Network Connection!')
      }
      
    }
  }

  async presentLoading(msg) {
    const loading = await this.loadingController.create({
      message: msg,
      duration: 2000
    });
    await loading.present();
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
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
