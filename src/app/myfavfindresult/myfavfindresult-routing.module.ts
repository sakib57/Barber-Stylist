import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyfavfindresultPage } from './myfavfindresult.page';

const routes: Routes = [
  {
    path: '',
    component: MyfavfindresultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyfavfindresultPageRoutingModule {}
