import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// interface IPaymentForm {
//   name: FormControl<string>;
//   email: string;
//   accountNumber: number;
//   total: number;
// };

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  public paymentForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),

  })

  constructor() { }

  ngOnInit(): void {
  }

}
