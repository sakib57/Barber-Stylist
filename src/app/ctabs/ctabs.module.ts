import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CtabsPageRoutingModule } from './ctabs-routing.module';

import { CtabsPage } from './ctabs.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    CtabsPageRoutingModule
  ],
  declarations: [CtabsPage]
})
export class CtabsPageModule {}
