import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { catchError, first, last, map, Observable, of, take } from "rxjs";
import { PaymentService } from "../../payment/payment.service";


@Injectable()
export class FundsAvailableValidator implements AsyncValidator {

  constructor(
    private paymentService: PaymentService
  ) { }

  validate(control: AbstractControl<number>): Observable<ValidationErrors | null> {
    return this.paymentService.availableBalance$.pipe(
      map(available => {
        return control.value > available ? { noFundsAvailable: true } : null;
      }),
      first(),
      catchError(() => of(null))
    );
  }

}
