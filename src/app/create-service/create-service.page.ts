import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PickerController,LoadingController, ToastController } from '@ionic/angular';
import { BarberService } from '../services/barber.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.page.html',
  styleUrls: ['./create-service.page.scss'],
})
export class CreateServicePage implements OnInit {
  form : FormGroup
  submitAttempt = false

  multiColumnOptions = [
    ['0','1','2','3','4','5','6','7','8','9','10','11','12'],
    ['0','15','30','45']
  ]
  constructor(
    public formBuilder: FormBuilder,
    public pickerController: PickerController,
    public barberService: BarberService,
    public authService: AuthServiceService,
    public storage: Storage,
    public router: Router,
    public toastController: ToastController,
    public loadingController: LoadingController

  ) {
    this.form = formBuilder.group({
      service_name: ['',Validators.compose([Validators.required])],
      duration: ['',Validators.compose([Validators.required])],
      price: ['',Validators.compose([Validators.required])],
      desc: ['',Validators.compose([Validators.required])],
    })
  }

  ngOnInit() {
  }

  onSubmit(){
    this.submitAttempt = true
    if(!this.form.valid){
      return 
    }else{
      this.presentLoading('Creating...')
      //console.log(this.form.value)
      this.storage.get('user_info').then(val=>{
        //console.log(val)
        const data = {
          service_name: this.form.value.service_name,
          duration: this.form.value.duration,
          price: this.form.value.price,
          emp_id: val.id,
          desc: this.form.value.desc,
        }
        if(this.authService.netConnected){
          this.barberService.addService(data).subscribe(res=>{
            console.log(res)
            if(res.status == 200){
              //this.events.publish('data',res.data);
              //this.router.navigateByUrl('/home/tabs/tab1')
              this.loadingController.dismiss().then(()=>{
                this.presentToast('Service creedat successfully').then(()=>{
                  this.form.reset()
                  this.submitAttempt = false
                })
              })
              
            }
          })
        }else{
          this.presentToast('No Network Connection!')
        }
      })
      
    }
    
  }

  async openPicker(numColumns, numOptions, columnOptions){
    const picker = await this.pickerController.create({
      columns: this.getColumns(numColumns, numOptions, columnOptions),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Done',
          handler: (value) => {
            //console.log(JSON.stringify(value));
            var hr = parseInt(value['col-0'].text);
            var mn = parseInt(value['col-1'].text);
            if(hr == 0 && mn != 0){
              this.form.patchValue ({
                duration: mn+" minutes"
              })
            }else if(hr == 1 && mn == 0){
              this.form.patchValue ({
                duration: hr+" hour"
              })
            }else if(hr == 1 && mn > 0){
              this.form.patchValue ({
                duration: hr+" hour "+mn+" minutes"
              })
            }else if(hr > 1 && mn == 0){
              this.form.patchValue ({
                duration: hr+" hours"
              })
            }else if(hr > 1 && mn > 0){
              this.form.patchValue ({
                duration: hr+" hours "+mn+" minutes"
              })
            }else{
              this.form.patchValue ({
                duration: null
              })
            }
          }
        }
      ]
        
    });
    await picker.present();
  }

  getColumns(numColumns, numOptions, columnOptions) {
    let columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push({
        name: `col-${i}`,
        options: this.getColumnOptions(i, numOptions, columnOptions)
      });
    }
    return columns;
  }
  
  getColumnOptions(columnIndex, numOptions, columnOptions) {
    let options = [];
    for (let i = 0; i < numOptions; i++) {
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i
      })
    }
    return options;
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
