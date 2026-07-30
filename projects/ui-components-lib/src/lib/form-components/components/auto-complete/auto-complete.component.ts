import { JsonPipe, NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { PrimeTemplate } from 'primeng/api';
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { FloatLabel } from 'primeng/floatlabel';
import { ValidationErrorsPipe } from '../../@utils/validations/validation-message.pipe';
import { BaseInputComponent } from '../base-input.component';
import { emailStcValidator } from '../../@utils/validations/email-stc.validator';

@Component({
  selector: 'stc-auto-complete',
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
    TranslatePipe,
    FloatLabel,
  ],
  templateUrl: './auto-complete.component.html',
  styleUrl: './auto-complete.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AutoCompleteComponent extends BaseInputComponent {
  @Input() selectedItemTemplate: TemplateRef<unknown> | null = null;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectOption: EventEmitter<AutoCompleteSelectEvent> =
    new EventEmitter<AutoCompleteSelectEvent>();
  @Input() items: any[] = [];
  @Input() minLengthToSearch = 3;
  @Input() delay = 300; // default value
  @Input() basicInput!: boolean;
  @Input() typeAhead: boolean = false;
  @Input() allowSpaces: boolean = false;
  @Input() taggable: boolean = true;
  @Input() variant: 'in' | 'over' | 'on' = 'over';
  @Input() allowedDomains: string[] | undefined = [];
  constructor() {
    super();
  }

  search(event: AutoCompleteCompleteEvent) {
    this.onSearch.emit(event.query);
  }

  onSelect(event: AutoCompleteSelectEvent) {
    this.selectOption.emit(event);
  }

  onKeyDown(event: KeyboardEvent) {
    const targetKeys = this.allowSpaces ? ['Enter'] : ['Enter', 'Tab', ' '];
    if (!targetKeys.includes(event.key) || !this.taggable) return;
    event.preventDefault();
    const input = event.target as HTMLInputElement;
    this.addValueFromInput(input);
  }

  onBlur(event: Event) {
    if (!this.taggable) return;
    const input = event.target as HTMLInputElement;
    this.addValueFromInput(input);
  }

  private addValueFromInput(input: HTMLInputElement) {
    const value = input.value?.trim();
    if (!value) return;
    const current = this.control.value ?? [];
    if (!current.includes(value)) {
      this.control.setValue([...current, value]);
      this.control.markAsDirty();
    }
    input.value = '';
  }

  isItemInvalid(item: string): boolean {
  if (this.control.errors?.['emailDomain']) {
    const tempControl = new FormControl(item, emailStcValidator(this.allowedDomains as string[]) );
    return tempControl.invalid;
  }
  return false;
}
}
