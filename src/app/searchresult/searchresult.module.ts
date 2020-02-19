import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchresultPageRoutingModule } from './searchresult-routing.module';
 import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchresultPage } from './searchresult.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    SearchresultPageRoutingModule
  ],
  declarations: [SearchresultPage]
})
export class SearchresultPageModule {}
