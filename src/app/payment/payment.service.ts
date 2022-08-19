import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private _availableBalance$: BehaviorSubject<number> = new BehaviorSubject<number>(500);
  public availableBalance$: Observable<number> = this._availableBalance$.asObservable();

  constructor() { }
}
