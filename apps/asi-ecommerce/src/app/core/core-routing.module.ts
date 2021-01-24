import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './auth/auth.guard';
import { UserGuard } from '../shared/stores/user/user.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [UserGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/products',
      },
      {
        path: 'cart',
        loadChildren: () => import('../features/cart/cart.module').then(m => m.CartModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'products',
        loadChildren: () => import('../features/products/products.module').then(m => m.ProductsModule),
      },
      {
        path: 'user',
        loadChildren: () => import('../features/user/user.module').then(m => m.UserModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'login',
        loadChildren: () => import('../features/login/login.module').then(m => m.LoginModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
