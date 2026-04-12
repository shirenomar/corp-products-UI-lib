import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { AppButtonComponent } from './app-button.component';
import { ButtonModule, ButtonStyle } from 'primeng/button';

const meta: Meta<AppButtonComponent> = {
  title: 'MyLibrary/Button',
  component: AppButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ButtonModule],
      providers: [ButtonStyle],
    }),
  ],
};

export default meta;
type Story = StoryObj<AppButtonComponent>;

export const Primary: Story = {
  args: {
    label: 'Click Me',
    severity: 'warn',
  },
};
export const Secondary: Story = {
  args: {
    label: 'Secondary Action',
    severity: 'danger',
  },
};
