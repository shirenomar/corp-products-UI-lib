import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Popover } from 'primeng/popover';
import { AppAccordionComponent, IcoMoonIconComponent } from '@corp-products/ui-components';
import { AccordionModule, AccordionStyle } from 'primeng/accordion';

const meta: Meta<AppAccordionComponent> = {
  title: 'MyLibrary/Accordion',
  component: AppAccordionComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [Popover, AccordionModule, , IcoMoonIconComponent],
      providers: [AccordionStyle],
    }),
  ],
  args: {
    iconName: 'people',
    iconClass: 'text-[24px] text-secondary',
    iconPathCount: 1,
    title: 'Accordion Title',
    contentBorderTop: true,
    accordionPanelBorder: true,
  },
  argTypes: {
    iconName: { control: 'text' },
    iconClass: { control: 'text' },
    iconPathCount: { control: 'number' },
    title: { control: 'text' },
    contentBorderTop: { control: 'boolean' },
    accordionPanelBorder: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<AppAccordionComponent>;

export const Default: Story = {
  args: {
    iconName: 'people',
    iconClass: 'text-[24px] text-secondary',
    iconPathCount: 1,
    title: 'Accordion Title',
    contentBorderTop: true,
    accordionPanelBorder: true,
  },
};
