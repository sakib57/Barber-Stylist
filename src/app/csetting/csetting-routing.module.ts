import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CsettingPage } from './csetting.page';

const routes: Routes = [
  {
    path: '',
    component: CsettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CsettingPageRoutingModule {}
