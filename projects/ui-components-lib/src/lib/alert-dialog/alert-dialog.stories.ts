import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AlertDialogComponent } from './alert-dialog.component';
import { AppButtonComponent } from '../app-button';
import { AvatarModule } from 'primeng/avatar';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
  DynamicDialogStyle,
} from 'primeng/dynamicdialog';
import { TranslatePipe } from '@ngx-translate/core';
import { AlertDialogService } from './alert-dialog.service';
import { Component } from '@angular/core';
import { ButtonStyle } from 'primeng/button';

@Component({
  selector: 'dialog-wrapper',
  template: `<app-button label="Open Alert Dialog" severity="primary"  (click)="open()"></app-button>`,
  standalone: true,
  imports: [AppButtonComponent],
})
class DialogWrapper {
  constructor(private dialogService: AlertDialogService) {}
  open() {
    this.dialogService.open({
      header: 'Hello!',
      message: 'Hello Hello',
      cancelBtnLabel: 'Close',
    });
  }
}

const meta: Meta<DialogWrapper> = {
  title: 'MyLibrary/AlertDialog',
  component: DialogWrapper,
  subcomponents: { AlertDialogComponent },
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [AppButtonComponent, AvatarModule, DynamicDialogModule,AppButtonComponent, TranslatePipe],
      providers: [
        DynamicDialogStyle,
        ButtonStyle,
        AlertDialogService,
        DialogService,
        { provide: DynamicDialogConfig, useValue: { data: { title: 'Alert' } } },
        { provide: DynamicDialogRef, useValue: {} },
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<DialogWrapper>; // Leave this empty!

export const Default: Story = {};
