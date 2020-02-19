import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassResetCodePageRoutingModule } from './pass-reset-code-routing.module';

import { PassResetCodePage } from './pass-reset-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PassResetCodePageRoutingModule
  ],
  declarations: [PassResetCodePage]
})
export class PassResetCodePageModule {}
