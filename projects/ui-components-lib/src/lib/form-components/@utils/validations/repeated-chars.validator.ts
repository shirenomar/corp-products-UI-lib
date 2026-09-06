import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const IGNORED_CHARS_REGEX = /[\s\d]/; // Whitespace and digits

export function maxRepeatedCharsValidator(maxRepeats = 3): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null;

    const str = value.toString();
    let count = 1;
    let prevChar: string | null = null;

    for (const char of str) {
      if (IGNORED_CHARS_REGEX.test(char)) {
        if (/\s/.test(char)) {
          count = 1;
          prevChar = null;
        }
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
