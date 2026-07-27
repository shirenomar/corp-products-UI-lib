import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideRouter } from '@angular/router';
import { AppSideMenuComponent } from './app-side-menu.component';

const meta: Meta<AppSideMenuComponent> = {
  title: 'MyLibrary/side menu',
  component: AppSideMenuComponent,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the side menu is expanded',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideRouter([])],
    }),
    moduleMetadata({
      imports: [AppSideMenuComponent],
    }),
  ],
  args: {
    isOpen: true,
  },
};

export default meta;
type Story = StoryObj<AppSideMenuComponent>;

export const Default: Story = {};
