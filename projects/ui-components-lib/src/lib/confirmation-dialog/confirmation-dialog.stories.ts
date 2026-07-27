import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { Component, DestroyRef, EventEmitter, Output } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { DialogService, DynamicDialogModule, DynamicDialogStyle } from 'primeng/dynamicdialog';
import { AppButtonComponent } from '../app-button';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { ConfirmationDialogService } from './confirmation-dialog.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DynamicFormComponent } from '@corp-products/ui-components';

@Component({
  selector: 'confirmation-dialog-story-wrapper',
  standalone: true,
  imports: [AppButtonComponent],
  template: `
    <app-button label="Open confirmation dialog" severity="primary" (click)="open()" />
  `,
})
class ConfirmationDialogStoryWrapper {
  header = 'Confirm action';
  message = 'Are you sure you want to continue?';
  hint?: string;
  confirmBtnId = 'story-confirm';
  cancelBtnId = 'story-cancel';
  confirmBtnLabel?: string;
  cancelBtnLabel?: string;
  breakpoints?: any;
  inputForm?: any;
  confirmBtnIcon?: string;
  confirmBtnPosition?: string;

  @Output() readonly dialogClosed = new EventEmitter<unknown>();

  constructor(
    private readonly confirmationDialog: ConfirmationDialogService,
    private readonly _destroyRef: DestroyRef,
  ) {}

  open(): void {
    this.confirmationDialog
      .open({
        header: this.header,
        message: this.message,
        confirmBtnId: this.confirmBtnId,
        cancelBtnId: this.cancelBtnId,
        cancelBtnLabel: this.cancelBtnLabel,
        confirmBtnLabel: this.confirmBtnLabel,
        hint: this.hint,
        confirmBtnIcon: this.confirmBtnIcon,
        confirmBtnPosition: this.confirmBtnPosition,
        inputForm: this.inputForm,
        breakpoints: this.breakpoints,
      })
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((result) => this.dialogClosed.emit(result));
  }
}

const meta: Meta<ConfirmationDialogStoryWrapper> = {
  title: 'MyLibrary/ConfirmationDialog',
  component: ConfirmationDialogStoryWrapper,
  subcomponents: { ConfirmationDialogComponent },
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter([])],
    }),
    moduleMetadata({
      imports: [AppButtonComponent, AvatarModule, DynamicDialogModule, DynamicFormComponent],
      providers: [ConfirmationDialogService, DialogService, DynamicDialogStyle],
    }),
  ],
  args: {
    header: 'Confirm action',
    message: 'Are you sure you want to continue?',
    hint: undefined,
    confirmBtnId: 'story-confirm',
    cancelBtnId: 'story-cancel',
    confirmBtnLabel: 'Confirm',
    cancelBtnLabel: 'Cancel',
    breakpoints: {
      '1024px': {
        width: '600px',
        height: '400px',
      },
    },
    // TODO: Add input form data
    inputForm: undefined,
    confirmBtnIcon: 'pi pi-check',
    confirmBtnPosition: 'left',
  },
  argTypes: {
      header: { control: 'text' },
      message: { control: 'text' },
      hint: { control: 'text' },
      confirmBtnId: { control: 'text' },
      cancelBtnId: { control: 'text' },
      confirmBtnLabel: { control: 'text' },
      cancelBtnLabel: { control: 'text' },
      breakpoints: { control: 'object' },
      inputForm: { control: 'object' },
      confirmBtnIcon: { control: 'text' },
      confirmBtnPosition: { control: 'text' },
      dialogClosed: {
        action: 'dialogClosed',
        table: { disable: true },
      },
  },
};

export default meta;
type Story = StoryObj<ConfirmationDialogStoryWrapper>;

export const Default: Story = {};
