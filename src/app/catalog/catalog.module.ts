import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { Route, RouterModule } from '@angular/router';
import { CatalogService } from './catalog.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CardModule } from '../shared/card/card.module';
import { CartServiceModule } from '../shared/cart-service/cart-service.module';
import { CartIdInterceptor } from '../shared/interceptors/cartId';

const routes: Route[] = [
  {
    path: '',
    component: CatalogComponent
  }
]


@NgModule({
  declarations: [
    CatalogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    CardModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CartIdInterceptor, multi: true },
    CatalogService
  ]
})
export class CatalogModule { }
