import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookappoinmentPage } from './bookappoinment.page';

const routes: Routes = [
  {
    path: '',
    component: BookappoinmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookappoinmentPageRoutingModule {}
