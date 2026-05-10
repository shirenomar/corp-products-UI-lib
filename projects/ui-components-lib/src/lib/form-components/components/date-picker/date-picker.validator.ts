import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const dateRangeValidator =
  (fromKey: string, toKey: string): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const fromControl = control.get?.(fromKey);
    const toControl = control.get?.(toKey);

    if (!fromControl?.value || !toControl?.value) {
      return null;
    }

    const from = new Date(fromControl.value);
    const to = new Date(toControl.value);

    from.setHours(0, 0, 0, 0);
    to.setHours(0, 0, 0, 0);

    return from > to ? { endDateBeforeStartDate: true } : null;
  };

export const notFutureDateValidator =
  (dateKey: string): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const dateControl = control.get?.(dateKey);

    if (!dateControl?.value) {
      return null;
    }

    const valueDate = new Date(dateControl.value);
    valueDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return valueDate > today ? { futureDate: true } : null;
  };
