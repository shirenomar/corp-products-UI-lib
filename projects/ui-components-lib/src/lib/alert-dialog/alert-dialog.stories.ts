import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AlertDialogComponent } from './alert-dialog.component';
import { AppButtonComponent } from '../app-button';
import { AvatarModule } from 'primeng/avatar';
import { DynamicDialogModule, DynamicDialogStyle } from 'primeng/dynamicdialog';
import { TranslatePipe } from '@ngx-translate/core';

const meta: Meta<AlertDialogComponent> = {
  title: 'MyLibrary/AlertDialog',
  component: `AlertDialogComponent`,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    moduleMetadata({
      imports: [AppButtonComponent, AvatarModule, DynamicDialogModule, TranslatePipe],
      providers: [DynamicDialogStyle],
    }),
  ],
};

export default meta;
type Story = StoryObj<AlertDialogComponent>; // Leave this empty!

export const Default: Story = {};
