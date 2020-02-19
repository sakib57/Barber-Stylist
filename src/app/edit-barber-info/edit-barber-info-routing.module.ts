import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditBarberInfoPage } from './edit-barber-info.page';

const routes: Routes = [
  {
    path: '',
    component: EditBarberInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBarberInfoPageRoutingModule {}
