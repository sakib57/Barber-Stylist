import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { BarberService } from '../services/barber.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-barber-cng-pass',
  templateUrl: './barber-cng-pass.page.html',
  styleUrls: ['./barber-cng-pass.page.scss'],
})
export class BarberCngPassPage implements OnInit {

  form: FormGroup
  submitAttempt = false
  barberId = null
  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthServiceService,
    public barberService: BarberService,
    public toastController: ToastController,
    public storage: Storage,
    public alertController: AlertController
  ) {
    this.form = formBuilder.group({
      oldPass: ['',Validators.compose([Validators.required])],
      newPass: ['',Validators.compose([Validators.required])],
      confNewPass: ['',Validators.compose([Validators.required])]
    },{validators: this.checkConfPass.bind(this)})
  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.storage.get('user_info').then(val=>{
      this.barberId = val.id
    })
  }

  onSubmit(){
    this.submitAttempt = true
    if(!this.form.valid){
      console.log('validation failed')
      return
    }else{
      //console.log(this.form.value)
      const data = {
        id: this.barberId,
        oldPass: this.form.value.oldPass,
        newPass: this.form.value.newPass
      }
      if(this.authService.netConnected){
        this.barberService.changePassword(data).subscribe(res=>{
          console.log(res)
          if(res.status == 200){
            this.presentToast('Password Updated!').then(()=>{
              this.form.reset()
              this.submitAttempt = false
            })
          }else if(res.status == 400){
            this.presentToast('Something went wrong, Try again').then(()=>{
              this.form.reset()
              this.submitAttempt = false
            })
          }else{
            this.presentAlert('Old pasword didn\'t match').then(()=>{
              this.form.reset()
              this.submitAttempt = false
            })
          }
        })
      }else{
        this.presentToast('No Network Connection!')
      }

    }

  }
  checkConfPass(formGroup: FormGroup) {
    const { value: password } = formGroup.get('newPass');
    const { value: conf_password } = formGroup.get('confNewPass');
    return password === conf_password ? null : { passwordNotMatch: true };
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
