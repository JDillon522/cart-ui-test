import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, scan, shareReplay, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private _availableBalance$: BehaviorSubject<number> = new BehaviorSubject<number>(500.00);
  public availableBalance$: Observable<number> = this._availableBalance$.asObservable();

  private countdown!: NodeJS.Timeout;

  constructor() { }

  public processTransaction(paymentAmount: number) {
    this.executeUiCountdown(paymentAmount);
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
        clearInterval(this.countdown)
      }

    }, 10);
  }
}
