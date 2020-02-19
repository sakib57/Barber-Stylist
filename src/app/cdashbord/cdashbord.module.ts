import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { CdashbordPageRoutingModule } from './cdashbord-routing.module';
 import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CdashbordPage } from './cdashbord.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    NgxIonicImageViewerModule,
    CdashbordPageRoutingModule,
  ],
  declarations: [CdashbordPage]
})
export class CdashbordPageModule {}
