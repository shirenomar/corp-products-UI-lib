import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { DynamicFormData, FormFieldTypeEnum, InputsMap } from "./dynamic-form.interface";
import {DatePickerComponent, FormUtils, SelectButtonComponent, ValidationErrorsPipe} from "../form-components";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-dynamic-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePickerComponent, ValidationErrorsPipe, TranslateModule, SelectButtonComponent],
  templateUrl: "./dynamic-form.component.html",
  styleUrl: "./dynamic-form.component.scss"
})
export class DynamicFormComponent implements OnInit {
  @Input({ required: true }) dynamicFormData: DynamicFormData;
  inputsNames: string[] = [];
  formGroup: FormGroup;
  inputsMap: InputsMap;
  readonly fieldType = FormFieldTypeEnum;
  getFormControl = FormUtils.getFormControl;

  ngOnInit(): void {
    this.formGroup = this.dynamicFormData?.formGroup as FormGroup;
    this.inputsMap = this.dynamicFormData?.inputsMap as InputsMap;
    this.inputsNames = Object.keys(this.inputsMap || {});
  }

}
