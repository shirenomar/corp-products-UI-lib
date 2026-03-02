import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localizedLabel',
  standalone: true,
  pure: false,
})
export class LocalizedLabelPipe implements PipeTransform {
  private readonly translateService = inject(TranslateService);

  transform(label: string): string {
    if (!label) return '';
    const lang = this.translateService.getCurrentLang() || 'ar';
    const suffix = lang.charAt(0).toUpperCase() + lang.slice(1);
    const key = label + `${suffix}`;
    return key;
  }
}
