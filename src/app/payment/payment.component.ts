import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FundsAvailableValidator } from '../shared/validators/fundsAvailable.validator';
import { PaymentService } from './payment.service';
import { mergeWith, takeUntil, tap } from 'rxjs/operators';
import { firstValueFrom, Subject } from 'rxjs';
import { IPaymentForm, IPaymentFormValue } from '../shared/interfaces/payment';
import { CartService } from '../shared/cart-service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [FundsAvailableValidator]
})
export class PaymentComponent implements OnInit, OnDestroy{
  public availableBalance$ = this.paymentService.availableBalance$;
  public transacting$ = this.paymentService.transacting$.pipe(
    mergeWith(this.paymentService.loading$),
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

  get paymentAmount(): FormControl<number> {
    return this.paymentForm.get('paymentAmount') as FormControl<number>;
  }

  // The only manual subscription because its getting late...
  private destroyed$ = new Subject();

  constructor(
    private paymentService: PaymentService,
    private fundsAvailable: FundsAvailableValidator,
    private cartService: CartService,
    private changeDetector: ChangeDetectorRef,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this.paymentService.getAvailableBalance();
    this.cartService.cart$.pipe(takeUntil(this.destroyed$)).subscribe(cart => {
      this.paymentAmount.setValue(cart.totalCost);
      this.paymentAmount.markAsTouched();
      this.paymentAmount.updateValueAndValidity();
    });
    /**
     * This is apparently a known bug with a fix out there but I dont know if its been released
     * https://github.com/angular/angular/issues/22556
     */
    this.changeDetector.detectChanges();
    setTimeout(() => {
      this.paymentAmount.disable();
    }, 0);
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }

  public async submit(): Promise<void> {
    if (this.paymentForm.invalid) {
      return;
    }

    const form = this.paymentForm.getRawValue() as IPaymentFormValue;

    await firstValueFrom(this.cartService.checkout());
    await this.cartService.getCart();
    await firstValueFrom(this.paymentService.processTransaction(form));

    this.paymentForm.reset();
  }

  public async addToBalance(amount: number) {
    await firstValueFrom(this.paymentService.addToBalance(amount));
    this.paymentAmount.markAsTouched();
    this.paymentAmount.updateValueAndValidity();
  }

  public reset(): void {
    this.paymentForm.reset();
  }
}
