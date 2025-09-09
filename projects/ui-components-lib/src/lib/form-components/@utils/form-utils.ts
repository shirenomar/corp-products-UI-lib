import {FormControl, FormGroup} from "@angular/forms";

export class FormUtils {
  static getFormControl(controlName: string, form: FormGroup): FormControl {
    if (!form) throw new Error(`Form is not initialized.`);
    const formControl = form.get(controlName) as FormControl;

    if (!formControl) throw new Error(`There's no form control with given name. '${controlName}'`);

    return formControl;
  }
}
