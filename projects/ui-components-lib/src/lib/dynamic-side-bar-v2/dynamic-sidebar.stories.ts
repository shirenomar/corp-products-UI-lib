import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Component, Input, inject } from '@angular/core';
import { AppButtonComponent } from '../app-button';
import { DynamicSidebarV2Service } from './dynamic-sidebar.service';
import { SidebarV2Actions } from './dynamic-sidebar.config';

@Component({
  standalone: true,
  template: `
    <div class="p-4 space-y-2">
      <p class="font-medium">{{ heading }}</p>
      <p class="text-sm text-gray-600">{{ description }}</p>
    </div>
  `,
})
class SidebarSampleContentComponent {
  heading = 'Sample content';
  description = 'This body is rendered dynamically inside the drawer.';
}

@Component({
  selector: 'sidebar-story-wrapper',
  standalone: true,
  imports: [AppButtonComponent],
  template: `<app-button label="Open sidebar" (click)="open()" />`,
})
class SidebarStoryWrapper {
  private sidebarService = inject(DynamicSidebarV2Service);

  @Input() title = 'Edit item';
  @Input() sidebarSize: 'sm' | 'md' | 'lg' = 'md';
  @Input() hideActions = false;
  @Input() contentHeading = 'Meeting details';
  @Input() contentDescription = 'Update the meeting information below.';
  @Input() actions?: SidebarV2Actions;

  open() {
    this.sidebarService.open({
      title: this.title,
      size: this.sidebarSize,
      component: SidebarSampleContentComponent,
      data: {
        heading: this.contentHeading,
        description: this.contentDescription,
      },
      hideActions: this.hideActions,
      actions: this.actions,
    });
  }
}

const meta: Meta<SidebarStoryWrapper> = {
  title: 'MyLibrary/Dynamic Sidebar',
  component: SidebarStoryWrapper,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [SidebarStoryWrapper, AppButtonComponent],
      providers: [DynamicSidebarV2Service],
    }),
  ],
  args: {
    title: 'Edit item',
    sidebarSize: 'md',
    hideActions: false,
    contentHeading: 'Meeting details',
    contentDescription: 'Update the meeting information below.',
  },
  argTypes: {
    sidebarSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    actions: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<SidebarStoryWrapper>;

export const Default: Story = {};
