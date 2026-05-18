import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const WHITESPACE_REGEX = /\s/;

export function maxRepeatedCharsValidator(maxRepeats = 3): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null;

    const str = value.toString();
    let count = 1;
    let prevChar: string | null = null;

    for (const char of str) {
      if (WHITESPACE_REGEX.test(char)) {
        continue;
      }

      if (prevChar !== null && char === prevChar) {
        count++;
        if (count > maxRepeats) {
          return { maxRepeatedChars: { maxRepeats } };
        }
      } else {
        count = 1;
      }

      prevChar = char;
    }

    return null;
  };
}
