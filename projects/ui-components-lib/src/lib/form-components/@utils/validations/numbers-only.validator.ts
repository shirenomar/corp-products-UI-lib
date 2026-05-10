import { AbstractControl, ValidationErrors } from '@angular/forms';

export function numbersOnlyValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value === null || value === undefined || value === '') {
    return null;
  }
  const isNumbersOnly = /^[0-9]+$/.test(value);
  return isNumbersOnly ? null : { numbersOnly: true };
}
