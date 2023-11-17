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
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../categories/categories.module').then(m => m.CategoriesPageModule)
          }
        ]
      },
      {
        path: 'tab5',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../customers/customers.module').then(m => m.CustomersPageModule)
          }
        ]
      },
      {
        path: 'tab4',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../cars/cars.module').then(m => m.CarsPageModule)
          },
          {
            path: 'details/:id',
            loadChildren: () => import('../search-cars/details/details.module').then( m => m.DetailsPageModule)
          }
        ]
      },
      {
        path: 'tab3',
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
