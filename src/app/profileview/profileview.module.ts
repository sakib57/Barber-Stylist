import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { ProfileviewPageRoutingModule } from './profileview-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileviewPage } from './profileview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    NgxIonicImageViewerModule,
    ProfileviewPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProfileviewPage]
})
export class ProfileviewPageModule {}
