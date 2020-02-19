import { Component } from '@angular/core';

import { Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  name = ''
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public events: Events,
    public storage: Storage,
    public router: Router
  ) {
    this.initializeApp();
    this.events.subscribe('user_info',res=>{
      console.log(res)
      if(res){
        this.name = res.fname+" "+res.lname
      }
      
    })
    this.storage.get('user_info').then(val=>{
      if(val){
        this.name = val.fname+" "+val.lname
      }
      
    })

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout(){
    this.storage.clear().then(()=>{
      this.router.navigateByUrl('/login')
    })

  }
}
