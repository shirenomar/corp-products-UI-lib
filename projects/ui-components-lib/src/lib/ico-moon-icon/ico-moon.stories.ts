import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { IcoMoonIconComponent } from './ico-moon-icon.component';


const meta: Meta<IcoMoonIconComponent> = {
  title: 'MyLibrary/Icons',
  component: IcoMoonIconComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [IcoMoonIconComponent],
    }),
  ],
  args: {
    iconName: 'font-icon-plus',
    iconClass: 'text-2xl text-primary',
    iconPathCount: 0,
  },
  argTypes: {
    iconName: {
      control: 'text',
      description: 'The name of the icon',
    },
    iconClass: {
      control: 'text',
      description: 'The class of the icon',
    },
    iconPathCount: {
      control: 'number',
      description: 'The number of paths in the icon',
    },
  } as Meta<IcoMoonIconComponent>['argTypes'],
};

export default meta;
type Story = StoryObj<IcoMoonIconComponent>;

export const Default: Story = {
  args: {
    iconName: 'font-icon-plus',
    iconClass: 'text-2xl text-primary',
    iconPathCount: 0,
  },
};
