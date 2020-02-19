import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyfavfindPageRoutingModule } from './myfavfind-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MyfavfindPage } from './myfavfind.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    MyfavfindPageRoutingModule
  ],
  declarations: [MyfavfindPage]
})
export class MyfavfindPageModule {}
