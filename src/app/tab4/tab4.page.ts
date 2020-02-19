import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { ToastController, ActionSheetController } from '@ionic/angular';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  apiLink=environment.apiLink;
  base64img = ''
  submitAttempt = false
  img = 'assets/images/kohli.jpg'

  form: FormGroup
  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public authService: AuthServiceService,
    public storage: Storage,
    public toastCtrl: ToastController,
    public camera: Camera,
    public actionSheetCtrl: ActionSheetController

  ) {
    this.form = formBuilder.group({
      email: ['',Validators.compose([Validators.required,Validators.email])],
      fname: ['',Validators.compose([Validators.required])],
      lname: ['',Validators.compose([Validators.required])]
    })
  }

  ionViewWillEnter(){
    this.storage.get('user_info').then(val=>{
      
    })
  }


}
