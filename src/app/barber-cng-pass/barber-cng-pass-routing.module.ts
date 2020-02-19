import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarberCngPassPage } from './barber-cng-pass.page';

const routes: Routes = [
  {
    path: '',
    component: BarberCngPassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarberCngPassPageRoutingModule {}
