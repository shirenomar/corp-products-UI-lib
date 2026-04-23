import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { AppButtonComponent } from '../app-button';
import { AvatarModule } from 'primeng/avatar';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
  DynamicDialogStyle,
} from 'primeng/dynamicdialog';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

const meta: Meta<ConfirmationDialogComponent> = {
  title: 'MyLibrary/ConfirmationDialog',
  component: ConfirmationDialogComponent,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    moduleMetadata({
      imports: [
        AppButtonComponent,
        AvatarModule,
        DynamicDialogModule,
        DynamicFormComponent,
        TranslatePipe,
      ],
      providers: [
        DialogService,
        DynamicDialogStyle,
        DynamicDialogConfig,
        DynamicDialogRef,
        TranslateService,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<ConfirmationDialogComponent>; // Leave this empty!

export const Default: Story = {};
