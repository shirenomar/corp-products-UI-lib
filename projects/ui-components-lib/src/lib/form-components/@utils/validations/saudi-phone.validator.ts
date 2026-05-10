import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
/**
 * Validator to check if the control value is a valid Saudi phone number.
 * Valid formats: 05XXXXXXXX (10 digits) or 009665XXXXXXXX (14 digits)
 */
export function saudiPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let value = control.value;

    if (!value) return null;

    // Convert to string and trim spaces
    value = value.toString().trim();

    // Regex: accepts 05XXXXXXXX or 009665XXXXXXXX
    const saudiPhoneRegex = /^(?:05\d{8}|009665\d{8})$/;

    if (!saudiPhoneRegex.test(value)) {
      return { invalidSaudiPhoneNumber: true };
    }

    return null;
  };
}
