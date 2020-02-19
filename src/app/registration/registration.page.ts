import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { Storage } from '@ionic/storage';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  Switch = false
  Change = false
  form : FormGroup
  submitAttempt = false
  countries = []
  states = []
  // default_country = {
  //   id: '230',
  //   name: 'United Kingdom'
  // }
  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public authService: AuthServiceService,
    public storage: Storage,
    public toastController: ToastController,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {
    this.form = formBuilder.group({
      fname: ['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z]*$'),Validators.minLength(3)])],
      lname: ['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z]*$'),Validators.minLength(3)])],
      phone: ['',Validators.compose([Validators.required])],
      email: ['',Validators.compose([Validators.required,Validators.email])],
      username: ['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9]*$'),Validators.minLength(3)])],
      password: ['',Validators.compose([Validators.required,Validators.minLength(6)])],
      addr1: ['',Validators.compose([Validators.required])],
      shopName: ['',Validators.compose([Validators.required])],
      addr2: ['',Validators.compose([Validators.required])],
      city: ['',Validators.compose([Validators.required])],
      state: ['',Validators.compose([Validators.required])],
      post_code: ['',Validators.compose([Validators.required])],
      country: ['',Validators.compose([Validators.required])],
      subscribe: [true],
      conf_password: ['',Validators.compose([Validators.required])],
    },{validators: this.password.bind(this)})
  }
  switch(e){
    this.Switch = e.detail.checked
  }
  change(e){
    this.Change = e.detail.checked
  }
  ngOnInit() {
    this.authService.getCountries().subscribe(res=>{
      console.log(res)
      if(res.status == 200){
        this.countries = res.countries
        this.getState()
      }
    })
  }

  getState(){
    this.states = []
    console.log(this.form.value.country)
    if(this.authService.netConnected){
      this.authService.getStates(this.form.value.country).subscribe(res=>{
        console.log(res)
        if(res.status == 200){
          this.states = res.states
        }
      })
    }
  }

  


  onSubmit(){
    
    this.submitAttempt = true
    if(!this.form.valid){
      return;
    }else{
      this.presentLoading('Sighining in...')
      //console.log(this.form.value)
      
        var data = {}
      if(this.Change){
        if(this.form.value.subscribe){
          data = {
            fname: this.form.value.fname,
            lname: this.form.value.lname,
            phone: this.form.value.phone,
            email: this.form.value.email,
            username: this.form.value.username,
            password: this.form.value.password,
            shopName: this.form.value.shopName,
            addr1: this.form.value.addr1,
            addr2: this.form.value.addr2,
            post_code: this.form.value.post_code,
            city: this.form.value.city,
            state: this.form.value.state,
            country: this.form.value.country,
            subscribe: '1',
            isStylist: '1'
          }
        }else{
          data = {
            fname: this.form.value.fname,
            lname: this.form.value.lname,
            phone: this.form.value.phone,
            email: this.form.value.email,
            username: this.form.value.username,
            password: this.form.value.password,
            shopName: this.form.value.shopName,
            addr1: this.form.value.addr1,
            addr2: this.form.value.addr2,
            post_code: this.form.value.post_code,
            city: this.form.value.city,
            state: this.form.value.state,
            country: this.form.value.country,
            subscribe: '0',
            isStylist: '1'
          }
        }
      }else{
        if(this.form.value.subscribe){
          data = {
            fname: this.form.value.fname,
            lname: this.form.value.lname,
            phone: this.form.value.phone,
            email: this.form.value.email,
            username: this.form.value.username,
            password: this.form.value.password,
            shopName: '',
            addr1: this.form.value.addr1,
            addr2: this.form.value.addr2,
            post_code: this.form.value.post_code,
            city: this.form.value.city,
            state: this.form.value.state,
            country: this.form.value.country,
            subscribe: '1',
            isStylist: '0'
          }
        }else{
          data = {
            fname: this.form.value.fname,
            lname: this.form.value.lname,
            phone: this.form.value.phone,
            email: this.form.value.email,
            username: this.form.value.username,
            password: this.form.value.password,
            shopName: '',
            addr1: this.form.value.addr1,
            addr2: this.form.value.addr2,
            post_code: this.form.value.post_code,
            city: this.form.value.city,
            state: this.form.value.state,
            country: this.form.value.country,
            subscribe: '0',
            isStylist: '0'
          }
        }
      }
      
      
      
      
      if(this.Switch){
        //console.log('Barber Registration')
        if(this.authService.netConnected){
          this.authService.barber_register(data).subscribe(res=>{
            //console.log(res)
            if(res.status ==200){
              this.loadingController.dismiss().then(()=>{
                this.presentAlert('Username or Email already exist!').then(()=>{
                  this.submitAttempt = false
                  this.form.patchValue({
                    email: '',
                    username: ''
                  })
                })
              })
            }
            if(res.status == 301){
              this.loadingController.dismiss().then(()=>{
                this.submitAttempt = false
                const user_info = {
                  fname: res.fname,
                  lname: res.lname,
                  id: res.id
                }
                this.storage.set('user_info',user_info).then(()=>{
                  this.router.navigateByUrl('/home2/tabs/tab1')
                })
              })
            }
          })
          
        }else{
          this.loadingController.dismiss().then(()=>{
            this.presentToast('No Network Connection!')
          })
        }
        
      }else{
        //onsole.log('Client Registration')
        if(this.authService.netConnected){
          this.authService.client_register(data).subscribe(res=>{
            //console.log(res)
            if(res.status ==200){
              this.loadingController.dismiss().then(()=>{
                this.presentAlert('Username or Email already exist!').then(()=>{
                  this.submitAttempt = false
                  this.form.patchValue({
                    email: '',
                    username: ''
                  })
                })
              })
            }
            if(res.status == 301){
              this.loadingController.dismiss().then(()=>{
                this.submitAttempt = false
                const user_info = {
                  fname: res.fname,
                  lname: res.lname,
                  id: res.id
                }
                this.storage.set('user_info',user_info).then(()=>{
                  this.router.navigateByUrl('/home/ctabs/tab1')
                })
              })
            }
          })
        }else{
          this.loadingController.dismiss().then(()=>{
            this.presentToast('No Network Connection!')
          })
        }
      }
    } 
  }


  password(formGroup: FormGroup) {
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

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Oops!',
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
