import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FundsAvailableValidator } from '../shared/validators/fundsAvailable.validator';
import { PaymentService } from './payment.service';
import { tap } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { IPaymentForm, IPaymentFormValue } from '../shared/interfaces/payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [FundsAvailableValidator]
})
export class PaymentComponent implements OnInit {
  public availableBalance$ = this.paymentService.availableBalance$;
  public transacting$ = this.paymentService.transacting$.pipe(
    tap((transacting: boolean) => transacting ? this.paymentForm.disable() : this.paymentForm.enable())
  );

  public paymentForm: FormGroup<IPaymentForm> = new FormGroup<IPaymentForm>({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.email),
    accountNumber: new FormControl(null, Validators.required),
    paymentAmount: new FormControl(null, {
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

  public async submit(): Promise<void> {
    const form = this.paymentForm.getRawValue() as IPaymentFormValue;

    await firstValueFrom(this.paymentService.processTransaction(form));

    this.paymentForm.reset();
  }



  public reset(): void {
    this.paymentForm.reset();
  }
}
