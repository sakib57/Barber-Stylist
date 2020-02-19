import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CdashbordPage } from './cdashbord.page';

const routes: Routes = [
  {
    path: '',
    component: CdashbordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CdashbordPageRoutingModule {}
