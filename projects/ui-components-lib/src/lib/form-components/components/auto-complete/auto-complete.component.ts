import { JsonPipe, NgClass, NgIf, NgTemplateOutlet } from "@angular/common";
import { Component, EventEmitter, Input, Output, TemplateRef } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ValidationErrorsPipe } from "../../@utils/validations/validation-message.pipe";
import { PrimeTemplate } from "primeng/api";
import { AutoComplete, AutoCompleteCompleteEvent, AutoCompleteSelectEvent } from "primeng/autocomplete";
import { BaseInputComponent } from "../base-input.component";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: "stc-auto-complete",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AutoComplete,
    PrimeTemplate,
    NgIf,
    NgTemplateOutlet,
    NgClass,
    JsonPipe,
    ValidationErrorsPipe,
    TranslatePipe
  ],
  templateUrl: "./auto-complete.component.html",
  styleUrl: "./auto-complete.component.scss"
})
export class AutoCompleteComponent extends BaseInputComponent {
  @Input() selectedItemTemplate: TemplateRef<unknown> | null = null;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectOption: EventEmitter<AutoCompleteSelectEvent> = new EventEmitter<AutoCompleteSelectEvent>();
  @Input() items: any[] = [];
  @Input() minLengthToSearch = 3;
  @Input() delay = 300; // default value
  @Input() basicInput!: boolean;

  constructor() {
    super();
  }

  search(event: AutoCompleteCompleteEvent) {
    this.onSearch.emit(event.query);
  }

  onSelect(event: AutoCompleteSelectEvent) {
    this.selectOption.emit(event);
  }
}
