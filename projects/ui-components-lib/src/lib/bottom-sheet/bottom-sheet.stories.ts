import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule, NgClass, NgTemplateOutlet } from '@angular/common';
import { BottomSheetComponent } from './bottom-sheet.component';
import { PrimeTemplate } from 'primeng/api';
import { Drawer } from 'primeng/drawer';
import { TooltipModule } from 'primeng/tooltip';

const meta: Meta<BottomSheetComponent> = {
  title: 'MyLibrary/BottomSheet',
  component: BottomSheetComponent,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    moduleMetadata({
      imports: [PrimeTemplate, Drawer, NgClass, NgTemplateOutlet, TooltipModule, CommonModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<BottomSheetComponent>; // Leave this empty!

export const Default: Story = {};
