import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
/**
 * Validator to check if the control value is a valid Saudi phone number.
 * Valid format: 05XXXXXXXX (10 digits)
 */
export function saudiPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let value = control.value;

    if (!value) return null;

    // Convert to string and trim spaces
    value = value.toString().trim();

    // Regex: starts with 05 and total 10 digits
    const saudiPhoneRegex = /^05\d{8}$/;

    if (!saudiPhoneRegex.test(value)) {
      return { invalidSaudiPhoneNumber: true };
    }

    return null;
  };
}
