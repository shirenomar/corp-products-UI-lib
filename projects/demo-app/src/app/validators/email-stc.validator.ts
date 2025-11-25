import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validator function to check if the control value is a valid email address.
 * @returns A validator function that checks if the value is a valid email address.
 */
export function emailValidator(): ValidatorFn {
  const allowedDomains = [
    'stc.com.sa',
    'stcs.com.sa',
    'channels.com.sa',
    'stcsc.sa',
    'aqalat.com.sa',
    'jawwy.sa',
    'intigral.net',
    'stc.com.kw',
    'stc.com.bh',
    'pif.gov.sa',
    'solutions.com.sa',
    'atcsc.com.sa',
    'tawal.com.sa',
    'iotsquared.com.sa',
    'stcpay.com.sa',
    'center3.com',
    'sirar.com.sa',
    'stcbank.com.sa',
    'alibabacloud.sa',
  ];

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
        (email) => typeof email === 'string' && isFromAllowedDomain(email)
      );

      if (!allFromAllowedDomains) {
        return { email: true };
      }

      // Validate each email
      const allValid = value.every((email) => typeof email === 'string' && validateEmail(email));
      return allValid ? null : { email: true };
    }

    // Single email validation
    const isValid = validateEmail(value);
    return isValid ? null : { email: true };
  };
}
