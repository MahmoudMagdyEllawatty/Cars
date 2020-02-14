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
                import('../search-packages/search-packages.module').then(m => m.SearchPackagesPageModule)
          },
          {
            path: 'details/:id',
            loadChildren: () =>
                import('../search-packages/details/details.module').then(m => m.DetailsPageModule)
          },
          {
            path: 'details/:id/order',
            loadChildren: () =>
                import('../search-packages/details/order/order.module').then(m => m.OrderPageModule)
          },
          {
            path: 'details/:id/order/payment',
            loadChildren: () =>
                import('../search-packages/details/order/payment/payment.module').then(m => m.PaymentPageModule)
          },
          {
            path: 'details/:id/order/delivery-details',
            loadChildren: () =>
                import('../search-packages/details/order/delivery-details/delivery-details.module').then(m => m.DeliveryDetailsPageModule)
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
