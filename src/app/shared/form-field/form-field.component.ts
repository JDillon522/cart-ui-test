import { AfterContentInit, ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

export enum ErrorsMessageEnum {
  'required' = 'Cant\'t be empty'
}

@Component({
  selector: 'app-form-field',
  template: `
    <div class="form-field" [ngClass]="{'has-error': error}">
      <ng-content #label select="[app-label]"></ng-content>
      <ng-content #inputEle select="[app-input]"></ng-content>
      <div class="error" *ngIf="error">
        <span>{{error}}</span>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements AfterContentInit {
  @Input()
  public control!: AbstractControl | FormControl | null;

  get error(): any {
    if (!this.control || !this.control?.errors) {
      return '';
    }
    const err = Object.keys(this.control?.errors)?.[0] as keyof typeof ErrorsMessageEnum;

    return ErrorsMessageEnum[err];
  }

  constructor() { }

  ngAfterContentInit(): void {

  }
}
