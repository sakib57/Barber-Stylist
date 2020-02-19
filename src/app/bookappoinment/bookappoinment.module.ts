 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { IonicModule } from '@ionic/angular';
import { BookappoinmentPageRoutingModule } from './bookappoinment-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BookappoinmentPage } from './bookappoinment.page';
import { NgCalendarModule  } from 'ionic2-calendar';
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    NgxIonicImageViewerModule,
    BookappoinmentPageRoutingModule,
    NgCalendarModule,
  ],
  declarations: [BookappoinmentPage]
})
export class BookappoinmentPageModule {}
