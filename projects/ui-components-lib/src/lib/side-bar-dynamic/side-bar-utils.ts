import {InjectionToken, Injector} from "@angular/core";

export const SIDEBAR_DATA = new InjectionToken<any>('SIDEBAR_DATA');

export function createCustomInjector(parentInjector: Injector, injectionToken: InjectionToken<unknown>, data: unknown): Injector {
  return Injector.create({
    parent: parentInjector,
    providers: [
      {
        provide: injectionToken,
        useValue: data ?? null
      }
    ]
  })
};


export enum SidebarActionType {
  SAVE = 'SAVE',
  SaveMore = 'SaveMore',
  CANCEL = 'CANCEL',
  SUBMIT = 'SUBMIT',
  CLOSE = 'CLOSE',
  CloseWithData = 'CloseWithData',
}

export interface SidebarActionEvent {
  type: SidebarActionType;
  payload?: any;
}
