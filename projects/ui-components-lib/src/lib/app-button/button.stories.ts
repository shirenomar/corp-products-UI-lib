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
  args: {
    label: 'Button',
    severity: 'primary',
    loading: false,
    loadingIcon: 'pi pi-spinner',
    disabled: false,
    outlined: false,
    rounded: false,
    raised: false,
    text: false,
    plain: false,
    link: false,
    autofocus: false,
    icon: '',
    iconPos: 'left',
    style: {},
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'The label of the button',
    },
    severity: {
      control: 'select',
      description: 'The severity of the button',
      options: [
        'primary',
        'secondary',
        'success',
        'info',
        'warn',
        'danger',
        'help',
        'contrast',
      ],
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
    },
    loadingIcon: {
      control: 'text',
      description:
        'The icon to display when the button is in loading state (e.g. pi pi-spinner)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    outlined: {
      control: 'boolean',
      description: 'Whether the button uses the outlined style',
    },
    rounded: {
      control: 'boolean',
      description: 'Whether the button has fully rounded borders',
    },
    raised: {
      control: 'boolean',
      description: 'Whether the button is raised (shadow)',
    },
    text: {
      control: 'boolean',
      description: 'Text-only style (no solid background)',
    },
    plain: {
      control: 'boolean',
      description: 'Whether the button uses the plain style',
    },
    link: {
      control: 'boolean',
      description: 'Whether the button is rendered as a link',
    },
    autofocus: {
      control: 'boolean',
      description: 'Whether the button is focused when the page loads',
    },
    icon: {
      control: 'text',
      description:
        'Icon class on the button (e.g. pi pi-star). Leave empty to hide the icon',
    },
    iconPos: {
      control: 'select',
      description: 'Position of the icon relative to the label',
      options: ['left', 'right', 'top', 'bottom'],
    },
    size: {
      control: 'select',
      description: 'The size of the button',
      options: ['small', 'large'],
    },
    variant: {
      control: 'select',
      description: 'PrimeNG variant (outlined / text)',
      options: ['outlined', 'text'],
    },
    styleClass: {
      control: 'text',
      description: 'Optional CSS class string on the root button',
    },
    style: {
      control: 'object',
      description: 'Inline style map for the button',
    },
  },
};

export default meta;
type Story = StoryObj<AppButtonComponent>;

export const Default: Story = {
  args: {
    label: 'Button',
  },
};
