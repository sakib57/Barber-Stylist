import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ctab3PageRoutingModule } from './ctab3-routing.module';

import { Ctab3Page } from './ctab3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ctab3PageRoutingModule
  ],
  declarations: [Ctab3Page]
})
export class Ctab3PageModule {}
