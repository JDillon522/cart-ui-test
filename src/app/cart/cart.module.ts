import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { Route, RouterModule } from '@angular/router';
import { CardModule } from '../shared/card/card.module';

const routes: Route[] = [
  {
    path: '',
    component: CartComponent
  }
]

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CardModule
  ]
})
export class CartModule { }
