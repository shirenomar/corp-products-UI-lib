import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InputComponent } from './../../../../ui-components-lib/src/lib/form-components/components/input/input.component';
import { FormUtils, AppButtonComponent, DynamicSidebarService } from '@corp-products/ui-components';

@Component({
  selector: 'app-side-bar',
  imports: [InputComponent,AppButtonComponent],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.scss'
})
export class SideBar {
  sidebarDynamicService = inject(DynamicSidebarService);
  form: FormGroup = new FormGroup({
    search: new FormControl(''),
  });
  getFormControl = FormUtils.getFormControl;
  onSubmit(){
    debugger
    console.log(this.form.value);
  }
  close() {
    console.log('close')
    this.sidebarDynamicService.close()
  }
}
