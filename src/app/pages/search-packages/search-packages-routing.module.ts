import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPackagesPage } from './search-packages.page';

const routes: Routes = [
  {
    path: '',
    component: SearchPackagesPage
  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPackagesPageRoutingModule {}
