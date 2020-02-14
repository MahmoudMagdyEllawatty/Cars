import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PackagesPage } from './packages.page';

const routes: Routes = [
  {
    path: '',
    component: PackagesPage
  },
  {
    path: 'add-package',
    loadChildren: () => import('./add-package/add-package.module').then( m => m.AddPackagePageModule)
  },
  {
    path: 'update-package',
    loadChildren: () => import('./update-package/update-package.module').then( m => m.UpdatePackagePageModule)
  },
  {
    path: 'select-groups',
    loadChildren: () => import('./select-groups/select-groups.module').then( m => m.SelectGroupsPageModule)
  },
  {
    path: 'select-services',
    loadChildren: () => import('./select-services/select-services.module').then( m => m.SelectServicesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackagesPageRoutingModule {}
