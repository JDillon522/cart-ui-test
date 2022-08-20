import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, delay, tap, withLatestFrom, map } from 'rxjs';
import { IFinalTransaction, IPaymentFormValue } from '../shared/interfaces/payment';

const MOCK_HTTP_DELAY = () => Math.random() * 1.5;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private _availableBalance$: BehaviorSubject<number> = new BehaviorSubject<number>(500.00);
  public availableBalance$: Observable<number> = this._availableBalance$.asObservable();

  private _transacting$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public transacting$: Observable<boolean> = this._transacting$.asObservable();

  private countdown!: NodeJS.Timeout;

  constructor() { }

  public processTransaction(form: IPaymentFormValue): Observable<boolean> {
    if (!form) {
      return of(false);
    }

    this._transacting$.next(true);

    return of(true).pipe(
      delay(MOCK_HTTP_DELAY()),
      withLatestFrom(this.availableBalance$),
      map(([boolean, previousBalance]) => {
        form.accountBalance = previousBalance;

        return boolean;
      }),
      tap(() => this.executeUiCountdown(form.paymentAmount as number)),
      tap(() => this.logTransaction(form))
    )
  }

  private preciseNumber(num: number): number {
    return parseFloat((num).toFixed(2));
  }

  private executeUiCountdown(paymentAmount: number) {
    const stop = this._availableBalance$.value - paymentAmount;
    let remainderToSubtract = paymentAmount;

    this.countdown = setInterval(() => {
      const val = this._availableBalance$.value;

      if (val > stop) {
        const decrement = remainderToSubtract >= 1 ? 1 : 0.01;
        const newTotal = this.preciseNumber(val - decrement);

        this._availableBalance$.next(newTotal);
        remainderToSubtract = this.preciseNumber(remainderToSubtract - decrement);

      } else {
        clearInterval(this.countdown);
        this._transacting$.next(false);
      }

    }, 10);
  }


  private logTransaction(form: IPaymentFormValue) {
    const log: IFinalTransaction = {
      name: form.name,
      email: form.email,
      accountNumber: form.accountNumber,
      paymentAmount: form.paymentAmount,
      accountBalance: form.accountBalance,
      newBalance: (form.accountBalance as number) - (form.paymentAmount as number)
    };

    console.log(log);
  }
}
