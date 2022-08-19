import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { Route, RouterModule } from '@angular/router';
import { FormFieldModule } from '../shared/form-field/form-field.module';
import { CardModule } from '../shared/card/card.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentService } from './payment.service';

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
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormFieldModule,
    CardModule
  ],
  providers: [
    PaymentService
  ]
})
export class PaymentModule { }
