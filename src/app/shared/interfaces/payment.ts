import { FormControl } from "@angular/forms";

export interface IPaymentForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  accountNumber: FormControl<number | null>;
  paymentAmount: FormControl<number | null>;
};

export interface IPaymentFormValue {
  name: string | null;
  email: string | null;
  accountNumber: number | null;
  paymentAmount: number | null;
  accountBalance: number | null;
};

export interface IFinalTransaction {
  name: string | null;
  email: string | null;
  accountNumber: number | null;
  accountBalance: number | null;
  paymentAmount: number | null;
  newBalance: number | null;
}
