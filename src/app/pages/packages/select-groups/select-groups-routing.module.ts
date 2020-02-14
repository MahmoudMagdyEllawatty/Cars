import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectGroupsPage } from './select-groups.page';

const routes: Routes = [
  {
    path: '',
    component: SelectGroupsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectGroupsPageRoutingModule {}
