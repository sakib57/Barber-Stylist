import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyfavfindresultPageRoutingModule } from './myfavfindresult-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MyfavfindresultPage } from './myfavfindresult.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    MyfavfindresultPageRoutingModule
  ],
  declarations: [MyfavfindresultPage]
})
export class MyfavfindresultPageModule {}
