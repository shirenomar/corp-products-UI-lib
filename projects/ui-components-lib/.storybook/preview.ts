import 'zone.js';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../../../documentation.json';
setCompodocJson(docJson);
import { applicationConfig, Preview } from '@storybook/angular';
import { PrimeNG, providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { importProvidersFrom } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
setCompodocJson(docJson);

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string) {
    return of({});
  }
}

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        providePrimeNG({
          theme: {
            preset: Aura,
            options: {
              darkModeSelector: false,
            },
          },
        }),
        PrimeNG,
        importProvidersFrom(
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useClass: FakeLoader,
            },
          }),
        ),
      ],
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
