import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePackagePage } from './update-package.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePackagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePackagePageRoutingModule {}
