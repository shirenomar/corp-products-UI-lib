import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { AppButtonComponent, AppDropdownMenuComponent } from '@corp-products/ui-components';
import { Popover } from 'primeng/popover';
import { ButtonModule, ButtonStyle } from 'primeng/button';

const meta: Meta<AppDropdownMenuComponent> = {
  title: 'MyLibrary/Dropdown',
  component: AppDropdownMenuComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [Popover, ButtonModule, AppButtonComponent],
      providers: [ButtonStyle],
    }),
  ],
  args: {
    buttonTitle: 'Dropdown Button',
    menuItems: [
      {
        title: 'Item 1',
        routerLink: '/item1',
        callback: () => {
          console.log('Callback function called');
        },
        icon: "pi pi-check",
        show: true,
        iconPosition:'left',
        textColor: 'purple',
      },
    ],
    popupMenuStyle: 'purple',
    buttonIcon: 'pi pi-ellipsis-v',
    buttonClass: 'p-button-primary',
    buttonStyle: 'p-button-primary',
    buttonSeverity: 'primary',
    buttonIconPosition: 'left',
  },
  argTypes: {
    buttonTitle: { control: 'text' },
    menuItems: { control: 'object' },
    popupMenuStyle: { control: 'select', options: ['purple', 'white'] },
    buttonIcon: { control: 'text' },
    buttonClass: { control: 'text' },
    buttonStyle: { control: 'text' },
    buttonSeverity: { control: 'select', options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger'] },
    buttonIconPosition: { control: 'select', options: ['left', 'right'] },
  },
};

export default meta;
type Story = StoryObj<AppDropdownMenuComponent>;

export const Default: Story = {
  args: {
    buttonTitle: 'Dropdown Button',
    menuItems: [
      {
        title: 'Item 1',
        routerLink: '/item1',
        callback: () => {
          console.log('Callback function called item1');
        },
        icon: "pi pi-check",
        show: true,
        iconPosition:'left',
        textColor: 'purple',
      },
      {
        title: 'Item 2',
        routerLink: '/item2',
        callback: () => {
          console.log('Callback function called item2');
        },
        icon: "pi pi-check",
        show: true,
        iconPosition:'left',
        textColor: 'purple',
      },
      {
        title: 'Item 3',
        routerLink: '/item3',
        callback: () => {
          console.log('Callback function called item3');
        },
        icon: "pi pi-check",
        show: true,
        iconPosition:'left',
        textColor: 'purple',
      },
    ],
    popupMenuStyle: 'purple',
    buttonIcon: 'pi pi-ellipsis-v',
    buttonClass: 'p-button-primary',
    buttonStyle: 'p-button-primary',
    buttonSeverity: 'primary',
    buttonIconPosition: 'left',
  },
};
