import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CsettingPageRoutingModule } from './csetting-routing.module';

import { CsettingPage } from './csetting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CsettingPageRoutingModule
  ],
  declarations: [CsettingPage]
})
export class CsettingPageModule {}
