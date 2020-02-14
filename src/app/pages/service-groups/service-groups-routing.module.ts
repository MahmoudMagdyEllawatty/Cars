import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceGroupsPage } from './service-groups.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceGroupsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceGroupsPageRoutingModule {}
