import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxRepeatedCharsValidator(maxRepeats = 3): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null;

    const str = value.toString();

    let count = 1;

    for (let i = 1; i < str.length; i++) {
      if (str[i] === str[i - 1]) {
        count++;
        if (count > maxRepeats) {
          return { maxRepeatedChars: true };
        }
      } else {
        count = 1;
      }
    }

    return null;
  };
}
