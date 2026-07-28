import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { Component, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AppButtonComponent } from '../app-button';
import { SideBarDynamicComponent } from './side-bar-dynamic.component';
import { DynamicSidebarService } from './dynamic-sidebar.service';
import { SidebarConfig, SidebarConfigDefaults } from './sidebar-config';

@Component({
  selector: 'side-bar-dynamic-story-content',
  standalone: true,
  template: `
    <p class="p-3 m-0">Sidebar content for Storybook.</p>
  `,
})
class SideBarDynamicStoryContent {}

@Component({
  selector: 'side-bar-dynamic-story-wrapper',
  standalone: true,
  imports: [AppButtonComponent],
  template: `
    <app-button label="Open sidebar" severity="primary" (click)="open()" />
  `,
})
class SideBarDynamicStoryWrapper {
  private readonly dynamicSidebarService = inject(DynamicSidebarService);

  sidebarConfig: SidebarConfig = {
    ...SidebarConfigDefaults,
    title: 'Sidebar',
    show: true,
    visible: true,
    closable: true,
    dismissible: true,
    showCancelBtn: true,
    showSaveBtn: true,
  };

  open(): void {
    this.dynamicSidebarService.open(SideBarDynamicStoryContent, this.sidebarConfig);
  }
}

const meta: Meta<SideBarDynamicStoryWrapper> = {
  title: 'MyLibrary/side bar dynamic',
  component: SideBarDynamicStoryWrapper,
  subcomponents: { SideBarDynamicComponent },
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter([])],
    }),
    moduleMetadata({
      imports: [AppButtonComponent, SideBarDynamicComponent, TranslatePipe],
    }),
  ],
  args: {
    sidebarConfig: {
      ...SidebarConfigDefaults,
      title: 'Sidebar',
      show: true,
      visible: true,
      closable: true,
      dismissible: true,
      showCancelBtn: true,
      showSaveBtn: true,
      actions: {
        save: {
          icon: 'pi pi-save',
          iconPos: 'left',
          style: 'primary',
        },
        saveAndMore: {
          icon: 'pi pi-plus',
          iconPos: 'left',
          style: 'primary',
          variant: 'outlined',
        },
        cancel: {},
      },
    },
  },
  argTypes: {
    sidebarConfig: {
      control: 'object',
      description: 'Configuration passed to DynamicSidebarService.open()',
    },
  },
};

export default meta;
type Story = StoryObj<SideBarDynamicStoryWrapper>;

export const Default: Story = {};
