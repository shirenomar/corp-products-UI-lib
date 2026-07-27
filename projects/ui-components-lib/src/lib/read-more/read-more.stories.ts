import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ReadMoreComponent } from './read-more.component';


const meta: Meta<ReadMoreComponent> = {
  title: 'MyLibrary/ReadMore',
  component: ReadMoreComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ReadMoreComponent],
    }),
  ],
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    styleClass: 'text-2xl text-primary',
    maxCharacters: 100,
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'The text to display',
    },
    styleClass: {
      control: 'text',
      description: 'The class of the style',
    },
    maxCharacters: {
      control: 'number',
      description: 'The number of characters to display',
    },
  },

};

export default meta;
type Story = StoryObj<ReadMoreComponent>;

export const Default: Story = {};
