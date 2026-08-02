import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { DeliveryPageComponent } from './pages/delivery-page/delivery-page.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'product-detail/:name/:price',
    component: ProductDetailPageComponent,
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
  },
  {
    path: 'delivery',
    component: DeliveryPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
