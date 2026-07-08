import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Validator to ensure the control value is not composed entirely of whitespace.
 * Empty values are allowed so that `Validators.required` can handle them separately.
 */
export function notOnlySpacesValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (value === null || value === undefined || value === '') {
    return null;
  }

  if (typeof value === 'string' && value.trim().length === 0) {
    return { notOnlySpaces: true };
  }

  return null;
}
