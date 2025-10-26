import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
@Component({
  template: '',
})
export abstract class BaseInputComponent implements OnInit, OnDestroy {
  @Input({ required: true }) control!: FormControl;
  @Input() name: string = '';
  @Input() label?: string;
  @Input() placeholder: string = '';
  @Input() inputId!: string;
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() hint?: string;

  protected destroy$ = new Subject<void>();

  get required(): boolean {
    return this.control.hasValidator(Validators.required);
  }

  get isInvalid(): boolean {
    return this.control.invalid && this.control.touched;
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
