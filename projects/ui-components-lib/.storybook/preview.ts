import 'zone.js';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
import { applicationConfig, Preview } from '@storybook/angular';
import { PrimeNG, providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
setCompodocJson(docJson);

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
