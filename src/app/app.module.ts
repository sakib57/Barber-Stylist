import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Network } from '@ionic-native/network/ngx';
import { NgCalendarModule  } from 'ionic2-calendar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { library } from '@fortawesome/fontawesome-svg-core'

import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

library.add(fas,far)// add all icons
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(), 
    AppRoutingModule,FontAwesomeModule,
    
    IonicStorageModule.forRoot({
      name: 'db_saloon',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NgxIonicImageViewerModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    Network,
    NgCalendarModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
