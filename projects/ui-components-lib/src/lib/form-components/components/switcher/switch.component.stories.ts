import { Meta, StoryObj } from "@storybook/angular";
import { SwitchComponent } from "./switch.component";
import { provideRouter } from "@angular/router";

const meta:  Meta<SwitchComponent>  = {
  title: 'MyLibrary/Switch button',
  component: SwitchComponent,
  tags: ['autodocs'],
  args: {
    label: 'Switch',
    key: 'switch',
    checked: false,
  },
  argTypes: {
    label: { control: 'text' },
    key: { control: 'text' },
    checked: { control: 'boolean' },
    onChange: { action: 'onChange' }
  },
};

export default meta;
type Story = StoryObj<SwitchComponent>;

export const Default: Story = {};


