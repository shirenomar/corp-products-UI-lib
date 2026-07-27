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
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

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
        provideAnimations(),
        CommonModule,
        providePrimeNG({
          theme: {
            preset: Aura,
            options: {
              darkModeSelector: false,
            },
          },
        }),
        PrimeNG,
        BrowserModule,
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
