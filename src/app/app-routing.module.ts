import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./pages/admin-dashboard/admin-dashboard.module').then( m => m.AdminDashboardPageModule)
  },
  {
    path: 'admin-orders',
    loadChildren: () => import('./pages/admin-orders/admin-orders.module').then( m => m.AdminOrdersPageModule)
  },
  {
    path: 'admin-messages',
    loadChildren: () => import('./pages/admin-messages/admin-settings.module').then(m => m.AdminSettingsPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'packages',
    loadChildren: () => import('./pages/packages/packages.module').then( m => m.PackagesPageModule)
  },
  {
    path: 'add-package',
    loadChildren: () => import('./pages/packages/add-package/add-package.module').then( m => m.AddPackagePageModule)
  },
  {
    path: 'search-packages',
    loadChildren: () => import('./pages/search-packages/search-packages.module').then( m => m.SearchPackagesPageModule)
  },
  {
    path: 'service-groups',
    loadChildren: () => import('./pages/service-groups/service-groups.module').then( m => m.ServiceGroupsPageModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./pages/services/services.module').then( m => m.ServicesPageModule)
  },
  {
    path: 'user-dashboard',
    loadChildren: () => import('./pages/user-dashboard/user-dashboard.module').then( m => m.UserDashboardPageModule)
  },
  {
    path: 'user-orders',
    loadChildren: () => import('./pages/user-orders/user-orders.module').then( m => m.UserOrdersPageModule)
  },
  {
    path: 'user-messages',
    loadChildren: () => import('./pages/user-messages/user-messages.module').then( m => m.UserMessagesPageModule)
  },
  {
    path: 'language-popover',
    loadChildren: () => import('./pages/language-popover/language-popover.module').then( m => m.LanguagePopoverPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./pages/terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'step2',
    loadChildren: () => import('./pages/search-packages/details/order/step2/step2.module').then(m => m.Step2PageModule)
  },
  {
    path: 'step3',
    loadChildren: () => import('./pages/search-packages/details/order/step3/step3.module').then(m => m.Step3PageModule)
  },
  {
    path: 'step4',
    loadChildren: () => import('./pages/search-packages/details/order/step4/step4.module').then(m => m.Step4PageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
