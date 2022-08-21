import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PaymentModule } from './payment/payment.module';
import { CardModule } from './shared/card/card.module';
import { CartServiceModule } from './shared/cart-service/cart-service.module';
import { CartIdInterceptor } from './shared/interceptors/cartId';

const routes: Route[] = [
  {
    path: 'catalog',
    loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'catalog'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'catalog'
  }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CardModule,
    CartServiceModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CartIdInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
