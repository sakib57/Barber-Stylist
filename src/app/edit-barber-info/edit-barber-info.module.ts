import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditBarberInfoPageRoutingModule } from './edit-barber-info-routing.module';

import { EditBarberInfoPage } from './edit-barber-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditBarberInfoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditBarberInfoPage]
})
export class EditBarberInfoPageModule {}
