import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ctab3Page } from './ctab3.page';

const routes: Routes = [
  {
    path: '',
    component: Ctab3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ctab3PageRoutingModule {}
