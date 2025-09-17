import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export function provideLocalizationLoader() {
  return provideTranslateHttpLoader({
    prefix: '/i18n/',
    suffix: '.json',
    enforceLoading: false,
    useHttpBackend: false
  });
}
