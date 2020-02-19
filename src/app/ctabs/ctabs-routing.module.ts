import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { CtabsPage } from './ctabs.page';

const routes: Routes = [
  {
    path: 'ctabs',
    component: CtabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../cdashbord/cdashbord.module').then(m => m.CdashbordPageModule)
          }
        ]
      },
      {
        path: 'search',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../search/search.module').then(m => m.SearchPageModule)
          }
        ]
      },
      {
        path: 'myfav',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../myfav/myfav.module').then(m => m.MyfavPageModule)
          }
        ]
      },
      {
        path: 'tab4',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../csetting/csetting.module').then(m => m.CsettingPageModule)
          }
        ]
      },
       {
        path: 'serachresult',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../searchresult/searchresult.module').then(m => m.SearchresultPageModule)
          }
        ]
      },
      {
        path: 'myfavfind',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../myfavfind/myfavfind.module').then(m => m.MyfavfindPageModule)
          }
        ]
      },
      {
        path: 'myfavfindresult',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../myfavfindresult/myfavfindresult.module').then(m => m.MyfavfindresultPageModule)
          }
        ]
      },
      {
        path: 'myappointments',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../myappointments/myappointments.module').then(m => m.MyappointmentsPageModule)
          }
        ]
      },
      {
        path: 'profileview/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../profileview/profileview.module').then(m => m.ProfileviewPageModule)
          }
        ]
      },
      {
        path: 'bookappoinment/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../bookappoinment/bookappoinment.module').then(m => m.BookappoinmentPageModule)
          }
        ]
      },
      {
        path: 'my-account',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../my-account/my-account.module').then( m => m.MyAccountPageModule)
          }
        ]
      },
      
      
      {
        path: '',
        redirectTo: '/ctabs/tab1',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CtabsPageRoutingModule { }
 