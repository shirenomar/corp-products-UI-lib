import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validator function to check if the control value is a valid email address.
 * @returns A validator function that checks if the value is a valid email address.
 */
export function emailStcValidator(allowedDomains : string[]): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Helper function to check if email is from allowed domain
    const isFromAllowedDomain = (email: string): boolean => {
      const domain = email.split('@')[1]?.toLowerCase();
      return allowedDomains.some((allowedDomain) => domain === allowedDomain.toLowerCase());
    };

    // Helper function to validate a single email
    const validateEmail = (email: string): boolean => {
      return emailPattern.test(email);
    };

    if (Array.isArray(value)) {
      // Check if all emails are from allowed domains
      const allFromAllowedDomains = value.every(
        (email) => typeof email === 'string' && isFromAllowedDomain(email),
      );

      if (!allFromAllowedDomains) {
        return { emailDomain: true };
      }

      // Validate each email
      const allValid = value.every((email) => typeof email === 'string' && validateEmail(email));
      return allValid ? null : { emailDomain: true };
    }

    // Single email validation (must match pattern AND be from allowed domain)
    const isValid = typeof value === 'string' && validateEmail(value);
    const allowed = typeof value === 'string' && isFromAllowedDomain(value);
    return isValid && allowed ? null : { emailDomain: true };
  };
}
