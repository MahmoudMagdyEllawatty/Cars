import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateServicePage } from './update-service.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateServicePageRoutingModule {}
