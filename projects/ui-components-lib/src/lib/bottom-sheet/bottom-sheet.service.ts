import { Injectable, Type } from '@angular/core';
import { BottomSheetComponent } from './bottom-sheet.component';

@Injectable({
  providedIn: 'root'
})
export class BottomSheetService {

  private bottomSheetRef!: BottomSheetComponent;

  register(component: BottomSheetComponent) {
    this.bottomSheetRef = component;
  }

  open<T>(component: Type<T>) {
    if (!this.bottomSheetRef) {
      console.error('BottomSheetComponent not registered yet!');
      return;
    }
    return this.bottomSheetRef.open(component);
  }

  hide() {
    this.bottomSheetRef?.hideBottomSheet();
  }

}
