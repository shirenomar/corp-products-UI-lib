import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InputComponent } from './../../../../ui-components-lib/src/lib/form-components/components/input/input.component';
import { FormUtils } from '@corp-products/ui-components';

@Component({
  selector: 'app-side-bar',
  imports: [InputComponent],
templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss'
})
export class SideBar {
  form: FormGroup = new FormGroup({
    search: new FormControl(''),
  });
  getFormControl = FormUtils.getFormControl;

}
