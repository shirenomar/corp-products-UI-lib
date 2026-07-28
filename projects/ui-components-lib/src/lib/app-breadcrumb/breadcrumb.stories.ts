import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, provideRouter, Routes } from '@angular/router';
import { AppBreadcrumbComponent } from './app-breadcrumb.component';

/** Empty outlet targets so `routerLink` in breadcrumb items can resolve in Storybook */
@Component({ standalone: true, template: '' })
class StoryRouterStubComponent {}

const storyRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: StoryRouterStubComponent },
  { path: 'payments', component: StoryRouterStubComponent },
];

const meta: Meta<AppBreadcrumbComponent> = {
  title: 'MyLibrary/Breadcrumb',
  component: AppBreadcrumbComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        provideRouter(storyRoutes),
        {
          provide: ActivatedRouteSnapshot,
          useValue: {
            children: [
              {
                data: {
                  breadcrumb: 'Home',
                  notClickableBreadcrumb: true,
                  isShown: true,
                  extraBreadcrumbs: [],
                },
              },
            ],
          }
        }
      ],
    }),
    moduleMetadata({
      imports: [AppBreadcrumbComponent],
    }),
  ],
  args: {
    items: [
      {
        notClickable: false,
        label: 'Home',
        routerLink: '/home',
        isShown: true,
        extraBreadcrumbs: [
          {
            label: 'Payment',
            routerLink: '/payments',
            isShown: true,
            position: 'after',
          },
        ],
      },
      {
        notClickable: false,
        label: 'Payment',
        routerLink: '/payments',
        isShown: true,
        extraBreadcrumbs: [
          {
            position: 'before',
            label: 'Payment',
            routerLink: '/payments',
          },
        ],
      },
    ],
  },
  argTypes: {
    items: {
      items: {
        type: 'object',
        properties: {
          notClickable: { type: 'boolean' },
          label: { type: 'string' },
          routerLink: { type: 'string' },
          isShown: { type: 'boolean' },
          extraBreadcrumbs: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                label: { type: 'string' },
                routerLink: { type: 'string' },
                isShown: { type: 'boolean' },
                position: { type: 'string' },
              },
            },
          },
        },
      },
    },
    ngOnInit: { table: { disable: true }, control: false },
    isShown: { table: { disable: true }, control: false },
    _checkEmpty: { table: { disable: true }, control: false },
    _checkHiddenBreadcrumb: { table: { disable: true }, control: false },
    _createBreadcrumbs: { table: { disable: true }, control: false },
    _getRecursiveKey: { table: { disable: true }, control: false },
  } as Meta<AppBreadcrumbComponent>['argTypes'],
};

export default meta;
type Story = StoryObj<AppBreadcrumbComponent>;

export const Default: Story = {
  args: {
    items: [
      {
        notClickable: false,
        label: 'Home',
        routerLink: '/home',
        isShown: true,
        extraBreadcrumbs: [
          {
            label: 'Payment',
            routerLink: '/payments',
            isShown: true,
            position: 'after',
          },
        ],
      },
      {
        notClickable: false,
        label: 'Payment',
        routerLink: '/payments',
        isShown: true,
        extraBreadcrumbs: [
          {
            position: 'before',
            label: 'Payment',
            routerLink: '/payments',
          },
        ],
      },
    ],
  },
};
