import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserDashboardPage } from './user-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: UserDashboardPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../search-cars/search-packages.module').then(m => m.SearchPackagesPageModule)
          },
          {
            path: 'details/:id',
            loadChildren: () =>
                import('../search-cars/details/details.module').then(m => m.DetailsPageModule)
          },
          {
            path: 'details/:id/payment',
            loadChildren: () =>
                import('../search-cars/details/payment/payment.module').then(m => m.PaymentPageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../user-orders/user-orders.module').then(m => m.UserOrdersPageModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../user-messages/user-messages.module').then(m => m.UserMessagesPageModule)
          }
        ]
      },
      {
        path: 'tab4',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../my-cars/my-cars.module').then(m => m.MyCarsPageModule)
          }
        ]
      },
      {
        path: 'tab5',
        children: [
          {
            path: '',
            loadChildren: () =>
                import('../profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/user-dashboard/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/user-dashboard/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDashboardPageRoutingModule {}
