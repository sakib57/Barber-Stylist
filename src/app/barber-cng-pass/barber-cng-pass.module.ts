import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarberCngPassPageRoutingModule } from './barber-cng-pass-routing.module';

import { BarberCngPassPage } from './barber-cng-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BarberCngPassPageRoutingModule
  ],
  declarations: [BarberCngPassPage]
})
export class BarberCngPassPageModule {}
