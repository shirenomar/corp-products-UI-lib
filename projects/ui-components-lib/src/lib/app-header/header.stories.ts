import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AppHeaderComponent } from './app-header.component';
import { ButtonModule, ButtonStyle } from 'primeng/button';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { Menu } from 'primeng/menu';
import { AppButtonComponent } from '../app-button';
import { CommonModule } from '@angular/common';

const defaultUserInfo = {
  userName: 'John Doe',
  email: 'john.doe@example.com',
};

const meta: Meta<AppHeaderComponent> = {
  title: 'MyLibrary/Header',
  component: AppHeaderComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [AppHeaderComponent, AppButtonComponent, Menu, TranslatePipe],
      providers: [ButtonStyle],
    }),
  ],
  args: {
    userInfo: defaultUserInfo,
  },
  argTypes: {
    userInfo: {
      control: 'object',
      description: 'Logged-in user display info (`userName`, `email`)',
    }
  },
};

export default meta;
type Story = StoryObj<AppHeaderComponent>;

export const Default: Story = {};

