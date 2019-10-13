import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { ShippingComponent } from './shipping/shipping.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth-guard';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'products/:productId', component: ProductDetailsComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'shipping', component: ShippingComponent, canActivate: [AuthGuard] },
  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
