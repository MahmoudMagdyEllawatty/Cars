import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardPage } from './admin-dashboard.page';
import {TabsPage} from '../../tabs/tabs.page';


const routes: Routes = [
  {
    path: '',
    component: AdminDashboardPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../service-groups/service-groups.module').then(m => m.ServiceGroupsPageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../services/services.module').then(m => m.ServicesPageModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../packages/packages.module').then(m => m.PackagesPageModule)
          },
          {
            path: 'view-package/:id',
            loadChildren: () => import('../packages/update-package/update-package.module').then( m => m.UpdatePackagePageModule)
          }
        ]
      },
      {
        path: 'tab4',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../admin-orders/admin-orders.module').then(m => m.AdminOrdersPageModule)
          }
        ]
      },
      {
        path: 'tab5',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../admin-messages/admin-settings.module').then(m => m.AdminSettingsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/admin-dashboard/tab2',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/admin-dashboard/tab2',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardPageRoutingModule {}
