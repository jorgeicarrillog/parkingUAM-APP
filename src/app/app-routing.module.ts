import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'parking/list',
    loadChildren: () => import('./pages/parking/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'parking/detail',
    loadChildren: () => import('./pages/parking/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'parking/check-qr',
    loadChildren: () => import('./pages/parking/check-qr/check-qr.module').then( m => m.CheckQrPageModule)
  },
  {
    path: 'historic',
    loadChildren: () => import('./pages/historic/historic.module').then( m => m.HistoricPageModule)
  },
  {
    path: 'vehicles/list',
    loadChildren: () => import('./pages/vehicles/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/vehicles/create/create.module').then( m => m.CreatePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
