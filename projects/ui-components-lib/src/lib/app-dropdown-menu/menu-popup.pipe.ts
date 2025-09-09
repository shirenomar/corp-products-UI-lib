import { Pipe, PipeTransform } from '@angular/core';
import {DropdownTextColor} from "./app-dropdown-menu";

@Pipe({
  name: 'popupTextColorClass',
  standalone: true,
  pure: true
})
export class MenuPopupTextColorPipe implements PipeTransform {
  transform(color?: DropdownTextColor): string {
    switch (color) {
      case 'white': return 'text-white';
      case 'purple': return 'text-purple-500';
      case 'green': return 'text-green-500';
      default: return 'text-white';
    }
  }
}
