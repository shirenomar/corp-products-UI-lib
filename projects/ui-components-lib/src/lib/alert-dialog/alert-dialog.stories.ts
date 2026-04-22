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

@Component({
  selector: 'dialog-wrapper',
  template: `<button (click)="open()">Show Dialog</button>`,
})
class DialogWrapper {
  constructor(private dialogService: AlertDialogService) {}
  open() {
    this.dialogService.open({ header: 'Hello!', message: 'Hello Hello' });
  }
}

const meta: Meta<DialogWrapper> = {
  title: 'MyLibrary/AlertDialog',
  component: DialogWrapper,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [AppButtonComponent, AvatarModule, DynamicDialogModule, TranslatePipe],
      providers: [
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
