import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { Route, RouterModule } from '@angular/router';
import { FormFieldModule } from '../shared/form-field/form-field.module';
import { CardModule } from '../shared/card/card.module';

const routes: Route[] = [
  {
    path: '',
    component: PaymentComponent
  }
];

@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormFieldModule,
    CardModule
  ]
})
export class PaymentModule { }
