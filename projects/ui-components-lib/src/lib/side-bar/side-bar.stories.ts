import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Component, Input } from '@angular/core';
import { AppButtonComponent } from '../app-button';
import { SideBarComponent } from './side-bar.component';

@Component({
  selector: 'side-bar-story-wrapper',
  standalone: true,
  imports: [SideBarComponent, AppButtonComponent],
  template: `
    <app-button
      [label]="show ? 'Hide sidebar' : 'Show sidebar'"
      (click)="toggle()"
    />
    <app-side-bar
      [show]="show"
      [title]="title"
      [contentTemplate]="contentTpl"
      [footerTemplate]="footerTpl"
      (hide)="show = false"
    />
    <ng-template #contentTpl>
      <p class="p-4">Sidebar content</p>
    </ng-template>
    <ng-template #footerTpl>
      <p class="p-4 text-sm text-gray-600">Footer area</p>
    </ng-template>
  `,
})
class SideBarStoryWrapper {
  @Input() title = 'Sidebar title';
  show = false;

  toggle() {
    this.show = !this.show;
  }
}

const meta: Meta<SideBarStoryWrapper> = {
  title: 'MyLibrary/Side Bar',
  component: SideBarStoryWrapper,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [SideBarStoryWrapper],
    }),
  ],
  args: {
    title: 'Sidebar title',
  },
};

export default meta;
type Story = StoryObj<SideBarStoryWrapper>;

export const Default: Story = {};
