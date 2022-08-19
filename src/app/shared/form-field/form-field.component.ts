import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export enum ErrorsMessageEnum {
  'required' = 'Cant\'t be empty',
  'email' = 'Must be a valid email'
}

@Component({
  selector: 'app-form-field',
  template: `
    <div class="form-field" [ngClass]="{'has-error': error}">
      <ng-content #label select="[app-label]"></ng-content>
      <ng-content #inputEle select="[app-input]"></ng-content>
    </div>
    <div class="error">
      <span *ngIf="error">{{error}}</span>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent {
  @Input()
  public control!: AbstractControl | null;

  get error(): any {
    if (!this.control?.errors || !this.control?.touched) {
      return '';
    }
    // Only display one error at a time
    const err = Object.keys(this.control?.errors as ValidationErrors)?.[0] as keyof typeof ErrorsMessageEnum;

    return ErrorsMessageEnum[err];
  }

  constructor() { }
}
