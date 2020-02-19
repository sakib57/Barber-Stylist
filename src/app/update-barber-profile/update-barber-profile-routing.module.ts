import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateBarberProfilePage } from './update-barber-profile.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateBarberProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateBarberProfilePageRoutingModule {}
