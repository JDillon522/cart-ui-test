import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';

interface IPaymentForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  accountNumber: FormControl<number | null>;
  total: FormControl<number | null>;
};

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  public paymentForm: UntypedFormGroup = new FormGroup<IPaymentForm>({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.email),
    accountNumber: new FormControl(null, Validators.required),
    total: new FormControl(null, Validators.required)
  })

  constructor() { }

  ngOnInit(): void {
  }

}
