import {inject, Injector, Pipe, PipeTransform} from '@angular/core';
import {createCustomInjector, SIDEBAR_DATA} from "libs/ui-components/src/lib/side-bar-dynamic/side-bar-utils";

@Pipe({
  name: 'dataInjector',
  standalone: true,
  pure: true
})
export class DataInjectorPipe implements PipeTransform {
  injector = inject(Injector);

  transform(data: unknown): Injector {
    return createCustomInjector(this.injector, SIDEBAR_DATA, data);
  }
}
