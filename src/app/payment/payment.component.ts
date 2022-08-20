import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { FundsAvailableValidator } from '../shared/validators/fundsAvailable.validator';
import { PaymentService } from './payment.service';

interface IPaymentForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  accountNumber: FormControl<number | null>;
  total: FormControl<number | null>;
};

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [FundsAvailableValidator]
})
export class PaymentComponent implements OnInit {
  public availableBalance$ = this.paymentService.availableBalance$;

  public paymentForm: FormGroup<IPaymentForm> = new FormGroup<IPaymentForm>({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.email),
    accountNumber: new FormControl(null, Validators.required),
    total: new FormControl(null, {
      validators: [Validators.required],
      asyncValidators: this.fundsAvailable.validate.bind(this.fundsAvailable),
      updateOn: 'change'
    })
  });

  constructor(
    private paymentService: PaymentService,
    private fundsAvailable: FundsAvailableValidator
  ) { }

  ngOnInit(): void {
  }

  public submit(): void {
    const total = this.paymentForm.get('total')?.value;

    this.paymentService.processTransaction(total as number)
  }

  public reset(): void {
    this.paymentForm.reset();
  }
}
