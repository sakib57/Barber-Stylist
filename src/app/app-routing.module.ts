import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  {
    path: '',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'forget',
    loadChildren: () => import('./forget/forget.module').then( m => m.ForgetPageModule)
  },  
  {
    path: 'home',
    loadChildren: () => import('./ctabs/ctabs.module').then(m => m.CtabsPageModule)
  },
  {
    path: 'home2',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'searchresult',
    loadChildren: () => import('./searchresult/searchresult.module').then( m => m.SearchresultPageModule)
  },
  {
    path: 'profileview',
    loadChildren: () => import('./profileview/profileview.module').then( m => m.ProfileviewPageModule)
  },
  {
    path: 'myfav',
    loadChildren: () => import('./myfav/myfav.module').then( m => m.MyfavPageModule)
  },
  {
    path: 'myfavfind',
    loadChildren: () => import('./myfavfind/myfavfind.module').then( m => m.MyfavfindPageModule)
  },
  {
    path: 'myfavfindresult',
    loadChildren: () => import('./myfavfindresult/myfavfindresult.module').then( m => m.MyfavfindresultPageModule)
  },
  {
    path: 'myappointments',
    loadChildren: () => import('./myappointments/myappointments.module').then( m => m.MyappointmentsPageModule)
  }, 
  {
    path: 'bookappoinment',
    loadChildren: () => import('./bookappoinment/bookappoinment.module').then( m => m.BookappoinmentPageModule)
  },
  {
    path: 'create-service',
    loadChildren: () => import('./create-service/create-service.module').then( m => m.CreateServicePageModule)
  },
  {
    path: 'edit-barber-info',
    loadChildren: () => import('./edit-barber-info/edit-barber-info.module').then( m => m.EditBarberInfoPageModule)
  },
  {
    path: 'update-barber-profile/:id',
    loadChildren: () => import('./update-barber-profile/update-barber-profile.module').then( m => m.UpdateBarberProfilePageModule)
  },
  {
    path: 'barber-cng-pass',
    loadChildren: () => import('./barber-cng-pass/barber-cng-pass.module').then( m => m.BarberCngPassPageModule)
  },
  {
    path: 'pass-reset-code',
    loadChildren: () => import('./pass-reset-code/pass-reset-code.module').then( m => m.PassResetCodePageModule)
  },
  {
    path: 'pass-recover',
    loadChildren: () => import('./pass-recover/pass-recover.module').then( m => m.PassRecoverPageModule)
  },
  // {
  //   path: 'my-account',
  //   loadChildren: () => import('./my-account/my-account.module').then( m => m.MyAccountPageModule)
  // },





  
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
