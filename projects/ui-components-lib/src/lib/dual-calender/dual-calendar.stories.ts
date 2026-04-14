import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DualCalendarComponent } from './dual-calendar.component';
import {
  NgbCalendar,
  NgbCalendarIslamicUmalqura,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { HijriCalendarComponent } from './hijri-calendar/hijri-calendar.component';
import { DatePickerSwitcherComponent } from './date-picker-switcher/date-picker-switcher.component';
import { TranslateLoader, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { GregorianCalendarComponent } from './gregorian-calendar/gregorian-calendar.component';

const meta: Meta<DualCalendarComponent> = {
  title: 'MyLibrary/dualCalendar',
  component: DualCalendarComponent,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    moduleMetadata({
      imports: [
        NgbDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
        DatePickerModule,
        FloatLabelModule,
        HijriCalendarComponent,
        DatePickerSwitcherComponent,
        TranslatePipe,
        GregorianCalendarComponent,
      ],
      providers: [{ provide: NgbCalendar, useClass: NgbCalendarIslamicUmalqura }],
    }),
  ],
};

export default meta;
type Story = StoryObj<DualCalendarComponent>; // Leave this empty!

export const Dual: Story = {};
