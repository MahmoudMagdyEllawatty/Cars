import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCarsPage } from './my-cars.page';

const routes: Routes = [
  {
    path: '',
    component: MyCarsPage
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCarsPageRoutingModule {}
