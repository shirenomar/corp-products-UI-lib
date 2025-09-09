import { NgClass, NgStyle } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ValidationErrorsPipe } from "../../@utils/validations/validation-message.pipe";
import { InputText } from "primeng/inputtext";
import { Textarea } from "primeng/textarea";
import { BaseInputComponent } from "../base-input.component";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: "stc-input",
  standalone: true,
  imports: [ReactiveFormsModule, InputText, Textarea, ValidationErrorsPipe, NgClass, NgStyle, TranslatePipe],
  templateUrl: "./input.component.html",
  styleUrl: "./input.component.scss"
})
export class InputComponent extends BaseInputComponent {
  @Input() type: "text" | "textarea" = "text";
  @Input() contentType: "text" | "email" | "number" = "text";
  @Input() prefix: string;
  @Input() rows = 2;
  @Input() cols = 20;
  @Input() autoResize = true;
  @Input() basicInput!: boolean;
  @Input() noStyle!: boolean;
  @Input() hideOptionalLabel: boolean;
  @Input() inputDirection: "ltr" | "rtl" | "inherit" = "inherit";

  constructor() {
    super();
  }
}
