import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AuthServiceService } from '../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pass-reset-code',
  templateUrl: './pass-reset-code.page.html',
  styleUrls: ['./pass-reset-code.page.scss'],
})
export class PassResetCodePage implements OnInit {

  submitAttempt = false
  form: FormGroup
  type = ''
  username = ''
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public formBuilder: FormBuilder,
    public authService: AuthServiceService,
    public storage: Storage,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController,
  ) {
    this.form = formBuilder.group({
      code: ['',Validators.compose([Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(4),Validators.maxLength(4)])]
    })
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.type = this.route.snapshot.paramMap.get('type')
    this.username = this.route.snapshot.paramMap.get('username')
    console.log(this.type+' '+this.username)
  }

  onSubmit(){
    this.submitAttempt = true
    if(!this.form.valid){
      return
    }else{
      this.presentLoading('Checking...')
      if(this.authService.netConnected){
        const data ={
          userName: this.username,
          code: this.form.value.code,
          type: this.type
        }
        if(this.authService.netConnected){
          this.authService.codeValidateUserPass(data).subscribe(res=>{
            console.log(res)
            this.loadingController.dismiss().then(()=>{
              if(res.status == 200){
                this.router.navigate(['/pass-recover',{type:this.type,username:this.username}])
              }else{
                this.presentAlert('Code doesn\'t match').then(()=>{
                  this.submitAttempt = false
                  this.form.reset()
                })
              }
            })
          })
        }else{
          this.loadingController.dismiss().then(()=>{
            this.presentToast('No Network Connection!');
          })
        }
        
      }else{
        this.presentToast('No Network Connection!')
      }
      console.log(this.form.value)
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
