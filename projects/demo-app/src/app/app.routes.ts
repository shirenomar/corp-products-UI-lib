import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'breadcrumb',
    loadComponent: () => import('./breadcrumb/breadcrumb').then(m => m.Breadcrumb)
  },
  {
    path: 'confirmationDialog',
    loadComponent: () => import('./confirmation-dialog/confirmation-dialog').then(m => m.ConfirmationDialog)
  },
  {
    path: 'sideBar',
    loadComponent: () => import('./side-bar/side-bar').then(m => m.SideBar)
  },
];
