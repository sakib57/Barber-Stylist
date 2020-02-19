import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { IonicModule } from '@ionic/angular';
 import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MyfavPageRoutingModule } from './myfav-routing.module';
 
import { MyfavPage } from './myfav.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    NgxIonicImageViewerModule,
    MyfavPageRoutingModule
  ],
  declarations: [MyfavPage]
})
export class MyfavPageModule {}
