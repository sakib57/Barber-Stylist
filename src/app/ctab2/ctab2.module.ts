import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ctab2PageRoutingModule } from './ctab2-routing.module';

import { Ctab2Page } from './ctab2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ctab2PageRoutingModule
  ],
  declarations: [Ctab2Page]
})
export class Ctab2PageModule {}
