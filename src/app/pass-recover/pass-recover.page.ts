import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-pass-recover',
  templateUrl: './pass-recover.page.html',
  styleUrls: ['./pass-recover.page.scss'],
})
export class PassRecoverPage implements OnInit {

  form: FormGroup
  submitAttempt = false
  type = ''
  username = ''
  constructor(
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public authService: AuthServiceService,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) {
    this.form = formBuilder.group({
      password: ['',Validators.compose([Validators.required,Validators.minLength(6)])],
      conf_password: ['',Validators.compose([Validators.required])]
    },{validators: this.chkConfPassword.bind(this)})
  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.type = this.route.snapshot.paramMap.get('type')
    this.username = this.route.snapshot.paramMap.get('username')
  }


  onSubmit(){
    this.submitAttempt = true
    if(!this.form.valid){
      return
    }else{
      this.presentLoading('Updating...')
      //console.log(this.form.value)
      const data = {
        type: this.type,
        username: this.username,
        password: this.form.value.password
      }
      //console.log(data)
      if(this.authService.netConnected){
          this.authService.resetPassword(data).subscribe(res=>{
            console.log(res)
            this.loadingController.dismiss().then(()=>{
              if(res.status == 200){
                this.presentToast('Password updated successfully!')
                this.router.navigateByUrl('/login')
              }else{
                this.presentToast('Something went wrong!')
              }
            })
          })
      }else{
        this.loadingController.dismiss().then(()=>{
          this.presentToast('No Network Connection!')
        })
      }
    }
  }

  chkConfPassword(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: conf_password } = formGroup.get('conf_password');
    return password === conf_password ? null : { passwordNotMatch: true };
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }



  async presentLoading(msg) {
    const loading = await this.loadingController.create({
      message: msg,
      duration: 2000
    });
    await loading.present();
  }

}
