import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateBarberProfilePageRoutingModule } from './update-barber-profile-routing.module';

import { UpdateBarberProfilePage } from './update-barber-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpdateBarberProfilePageRoutingModule
  ],
  declarations: [UpdateBarberProfilePage]
})
export class UpdateBarberProfilePageModule {}
