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
    path: 'search-cars',
    loadChildren: () => import('./pages/search-cars/search-packages.module').then(m => m.SearchPackagesPageModule)
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
    path: 'cars',
    loadChildren: () => import('./pages/cars/cars.module').then(m => m.CarsPageModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('./pages/customers/customers.module').then( m => m.CustomersPageModule)
  },
  {
    path: 'my-cars',
    loadChildren: () => import('./pages/my-cars/my-cars.module').then( m => m.MyCarsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
