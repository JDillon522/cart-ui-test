import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './cart.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CartIdInterceptor } from '../interceptors/cartId';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CartIdInterceptor, multi: true },
    CartService
  ]
})
export class CartServiceModule { }
