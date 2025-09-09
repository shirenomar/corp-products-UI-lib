import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';
import { BaseInputComponent } from "../base-input.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {LabelValue} from "../../interfaces";

@Component({
  selector: "stc-select-button",
  standalone: true,
  imports: [ReactiveFormsModule, SelectButtonModule, FormsModule],
  templateUrl: "./select-button.component.html",
  styleUrl: "./select-button.component.scss"
})
export class SelectButtonComponent extends BaseInputComponent {
  @Output() onChange: EventEmitter<any> = new EventEmitter<string>();
  @Input() options: LabelValue<any>[];
  @Input() title: string;

  changeValue(e: SelectButtonChangeEvent) {
    this.onChange.emit(e.value);
  }
}
