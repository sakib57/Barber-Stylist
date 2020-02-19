import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {

  form: FormGroup
  errorMsg = ''
  submitAttempt = false
  constructor(
    public router: Router,
    public authService: AuthServiceService,
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {
    this.form = formBuilder.group({
      email: ['',Validators.compose([Validators.required])]
    })
  }

  ngOnInit() {
  }

  onSubmit(){
    this.submitAttempt = true
    this.errorMsg = ''
    if(!this.form.valid){
      return
    }else{
      this.presentLoading('Checking...')
      //console.log(this.form.value)
      if(this.authService.netConnected){
        this.authService.forgetUserPass(this.form.value.email).subscribe(res=>{
          console.log(res)
          if(res.status == 200){
            this.loadingController.dismiss().then(()=>{
              //this.router.navigateByUrl('/pass-reset-code')
              this.router.navigate(['/pass-reset-code',{type:res.type,username:res.info.username}])
            })
            
          }else{
            this.loadingController.dismiss().then(()=>{
              this.presentAlert('This user is not registered!').then(()=>{
                this.submitAttempt = false
                this.form.reset()
              })
            })
          }
        })
      }else{
        this.presentToast('No Network Connection!')
      }
      
    }
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

  async presentLoading(msg) {
    const loading = await this.loadingController.create({
      message: msg,
      duration: 2000
    });
    await loading.present();
  }

}
