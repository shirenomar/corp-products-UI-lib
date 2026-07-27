import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { AppTabsComponent } from './app-tabs.component';

@Component({ standalone: true, template: '<p>Tab 1 content</p>' })
class Tab1ContentComponent {}

@Component({ standalone: true, template: '<p>Tab 2 content</p>' })
class Tab2ContentComponent {}

const routes: Routes = [
  { path: 'tab1', component: Tab1ContentComponent },
  { path: 'tab2', component: Tab2ContentComponent },
  { path: '', redirectTo: 'tab1', pathMatch: 'full' },
];

const meta: Meta<AppTabsComponent> = {
  title: 'MyLibrary/Tabs',
  component: AppTabsComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter(routes)],
    }),
    moduleMetadata({
      imports: [AppTabsComponent],
    }),
  ],
  args: {
    tabs: {
      key: 'tabs',
      isRouted: true,
      items: [
        { title: 'Tab 1', link: '/tab1' },
        { title: 'Tab 2', link: '/tab2' },
      ],
    },
    tabsStyle: 'basic',
    responsive: false,
    twoDigitCount: false,
  },
  argTypes: {
    tabs: {
      control: 'object',
      description: 'The tabs to display',
    },
    tabsStyle: {
      control: 'select',
      options: ['basic', 'primary_light', 'primary'],
      description: 'The style of the tabs',
    },
    responsive: {
      control: 'boolean',
      description: 'Whether the tabs are responsive',
    },
    twoDigitCount: {
      control: 'boolean',
      description: 'Whether the count is a two digit number',
    }
  },
};

export default meta;
type Story = StoryObj<AppTabsComponent>;

export const Default: Story = {};

