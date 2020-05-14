import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckQrPage } from './check-qr.page';

const routes: Routes = [
  {
    path: '',
    component: CheckQrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckQrPageRoutingModule {}
