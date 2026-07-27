import type { Meta, StoryObj } from '@storybook/angular';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BottomSheetComponent } from './bottom-sheet.component';
import { AppButtonComponent } from '../app-button';

@Component({
  selector: 'bottom-sheet-story-host',
  standalone: true,
  imports: [BottomSheetComponent, AppButtonComponent],
  template: `
    <ng-template #sheetBody>
      <div style="padding: 1rem">
        <p>Sample content passed via <code>TemplateRef</code> from the story host.</p>
      </div>
    </ng-template>
    <app-button (click)="show = !show">show bottom sheet</app-button>
    <app-bottom-sheet
      [show]="show"
      [contentTemplate]="sheetBody"
      (onHide)="show = false;onHide.emit($eveny);"
      (onShow)="show = true;onShow.emit($eveny);"
    />
  `,
})
class BottomSheetStoryHost {
  @Input() show = false;

  @Output() readonly onHide = new EventEmitter<boolean>();
  @Output() readonly onShow = new EventEmitter<boolean>();

}

const meta: Meta<BottomSheetStoryHost> = {
  title: 'MyLibrary/BottomSheet',
  component: BottomSheetStoryHost,
  subcomponents: { BottomSheetComponent },
  tags: ['autodocs'],
  argTypes: {
    show: { control: 'boolean' },
    onHide: {
      action: 'onHide',
      table: { disable: true },
    },
    onShow: {
      action: 'onShow',
      table: { disable: true },
    },
  },
  args: {
    show: false,
  },
};

export default meta;
type Story = StoryObj<BottomSheetStoryHost>;

export const Default: Story = {};
