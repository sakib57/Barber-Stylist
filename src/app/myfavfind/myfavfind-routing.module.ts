import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyfavfindPage } from './myfavfind.page';

const routes: Routes = [
  {
    path: '',
    component: MyfavfindPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyfavfindPageRoutingModule {}
