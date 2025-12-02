import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, signal, ViewEncapsulation, } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TagModule } from 'primeng/tag';
import moment from 'moment-hijri';

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  isPrevMonth: boolean;
}

interface SelectedDate {
  day: number;
  month: number;
  year: number;
  gregorian?: string;
  hijri?: string;
}

@Component({
  selector: 'app-hiijri-gregorian',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TagModule,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './hiijri-gregorian.component.html',
  styleUrl: './hiijri-gregorian.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HiijriGregorianComponent implements OnInit {

  @Output() onnDateSelect = new EventEmitter<SelectedDate>();
  correspondenceForm!: FormGroup;
  mode: 'hijri' | 'gregorian' = 'hijri';
  selectedDate: SelectedDate | null = null;
  currentMonth = 10; // September (0-indexed)
  currentYear = 2020;
  showYearPicker = false;
  yearRangeStart = 2020;
  yearRangeEnd = 2031;
  calenderSelectedDate!: CalendarDay;
  // Store the equivalent date in the other calendar
  equivalentDate: { month: number; year: number; day: number } | null = null;

  arabicDays = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'];

  gregorianMonths = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];

  hijriMonths = [
    'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة',
    'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
  ];
  ngOnInit() {
      const today = new Date();
    this.currentMonth = new Date().getMonth();   // 0-indexed (0 = Jan)
    this.currentYear = new Date().getFullYear();

     if (this.mode === 'hijri') {
      const hijriToday = this.gregorianToHijri(today.getDate(), today.getMonth(), today.getFullYear());
      this.currentMonth = hijriToday.month;
      this.currentYear = hijriToday.year;
    }
  }

  get calendarDays(): CalendarDay[] {
    console.log('calendarDays')
    return this.generateCalendarDays();
  }

  getMonthName(): string {
    console.log('getMonthName')

    const months = this.mode === 'hijri' ? this.hijriMonths : this.gregorianMonths;
    return months[this.currentMonth];
  }
  getYearChunks(): number[][] {
    console.log('getYearChunks')

    const years = this.getYearRange();
    const chunks: number[][] = [];

    for (let i = 0; i < years.length; i += 2) {
      chunks.push(years.slice(i, i + 2));
    }

    return chunks;
  }
  getDaysInMonth(year: number, month: number): number {
    console.log('getDaysInMonth')

    return new Date(year, month + 1, 0).getDate();
  }

  getFirstDayOfMonth(year: number, month: number): number {
    console.log('getFirstDayOfMonth')

    return new Date(year, month, 1).getDay();
  }

  generateCalendarDays(): CalendarDay[] {
    console.log('generateCalendarDays')

    const daysInMonth = this.getDaysInMonth(this.currentYear, this.currentMonth);
    const firstDay = this.getFirstDayOfMonth(this.currentYear, this.currentMonth);
    const prevMonthDays = this.getDaysInMonth(this.currentYear, this.currentMonth - 1);

    const days: CalendarDay[] = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        isPrevMonth: true
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        isPrevMonth: false
      });
    }

    // Next month days to fill the grid
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        isPrevMonth: false
      });
    }

    return days;
  }

  selectDate(dateObj: CalendarDay): void {
    console.log('selectDate')
debugger
    if(!dateObj) return
    // if (!dateObj.isCurrentMonth) return;
    this.calenderSelectedDate = {...dateObj}
    const gregorianDate = this.mode === 'gregorian'
      ? { day: dateObj.day, month: this.currentMonth, year: this.currentYear }
      : this.hijriToGregorian(dateObj.day, this.currentMonth, this.currentYear);

    const hijriDate = this.mode === 'hijri'
      ? { day: dateObj.day, month: this.currentMonth, year: this.currentYear }
      : this.gregorianToHijri(dateObj.day, this.currentMonth, this.currentYear);

    // Store the equivalent date for highlighting
    this.equivalentDate = this.mode === 'gregorian' ? hijriDate : gregorianDate;

    this.selectedDate = {
      day: dateObj.day,
      month: this.currentMonth,
      year: this.currentYear,
      gregorian: this.formatDate(gregorianDate, this.gregorianMonths),
      hijri: this.formatDate(hijriDate, this.hijriMonths)
    };

    // this.onnDateSelect.emit(this.selectedDate | nul);
  }

  formatDate(date: { day: number; month: number; year: number }, months: string[]): string {
    console.log('formatDate')

    return `${date.day} ${months[date.month]} ${date.year}`;
  }

  isSelected(dateObj: CalendarDay): boolean {
    console.log('isSelected')

    if (!dateObj.isCurrentMonth) return false;

    // Check if this is the selected date in current mode
    const isCurrentModeSelected = this.selectedDate &&
      this.selectedDate.day === dateObj.day &&
      this.selectedDate.month === this.currentMonth &&
      this.selectedDate.year === this.currentYear;

    // Check if this is the equivalent date when viewing the other calendar
    const isEquivalentDate = this.equivalentDate &&
      this.equivalentDate.day === dateObj.day &&
      this.equivalentDate.month === this.currentMonth &&
      this.equivalentDate.year === this.currentYear;

    return !!(isCurrentModeSelected || isEquivalentDate);
  }
  isToday(dateObj: CalendarDay): boolean {
    const today = new Date();

    if (this.mode === 'gregorian') {
      return dateObj.day === today.getDate() &&
        this.currentMonth === today.getMonth() &&
        this.currentYear === today.getFullYear() &&
        dateObj.isCurrentMonth;
    } else {
      const hijriToday = this.gregorianToHijri(today.getDate(), today.getMonth(), today.getFullYear());
      return dateObj.day === hijriToday.day &&
        this.currentMonth === hijriToday.month &&
        this.currentYear === hijriToday.year &&
        dateObj.isCurrentMonth;
    }
  }


  switchMode(newMode: 'hijri' | 'gregorian'): void {
    if(this.mode == newMode) return
    this.mode = newMode;
    console.log('switchMode')

    // If there's a selected date, convert the calendar to show the equivalent date
    if (this.equivalentDate) {
      this.currentMonth = this.equivalentDate.month;
      this.currentYear = this.equivalentDate.year;
    }
    // debugger

      // this.selectDate(this.calenderSelectedDate)
  }

  prevMonth(): void {
    console.log('prevMonth')

    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
  }

  nextMonth(): void {
    console.log('nextMonth')

    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
  }

  toggleYearPicker(): void {
    console.log('toggleYearPicker')

    this.showYearPicker = !this.showYearPicker;
    if (this.showYearPicker) {
      // Center the current year in the range
      this.yearRangeStart = this.currentYear - 6;
      this.yearRangeEnd = this.currentYear + 5;
    }
  }

  getYearRange(): number[] {
    console.log('getYearRange')

    const years = [];
    for (let i = this.yearRangeStart; i <= this.yearRangeEnd; i++) {
      years.push(i);
    }
    return years;
  }

  selectYear(year: number): void {
    console.log('selectYear')

    this.currentYear = year;
    this.showYearPicker = false;
  }

  previousYearRange(): void {
    console.log('previousYearRange')

    this.yearRangeStart -= 12;
    this.yearRangeEnd -= 12;
  }

  nextYearRange(): void {
    console.log('nextYearRange')

    this.yearRangeStart += 12;
    this.yearRangeEnd += 12;
  }

  // Hijri to Gregorian conversion (simplified algorithm)
  // hijriToGregorian(day: number, month: number, year: number): { day: number; month: number; year: number } {
  //   console.log('hijriToGregorian')

  //   // This is a simplified conversion. For production, use a library like moment-hijri
  //   const jd = this.hijriToJulian(day, month + 1, year);
  //   return this.julianToGregorian(jd);
  // }
  hijriToGregorian(day: number, month: number, year: number): { day: number; month: number; year: number } {
  console.log('hijriToGregorian');

  const hijriDate = (moment as any)(`${year}-${month + 1}-${day}`, 'iYYYY-iM-iD');

  return {
    day: hijriDate.date(),
    month: hijriDate.month(),
    year: hijriDate.year()
  };
}

  // Gregorian to Hijri conversion (simplified algorithm)
  // gregorianToHijri(day: number, month: number, year: number): { day: number; month: number; year: number } {
  //   console.log('gregorianToHijri')

  //   // This is a simplified conversion. For production, use a library like moment-hijri
  //   const jd = this.gregorianToJulian(day, month + 1, year);
  //   return this.julianToHijri(jd);
  // }

 gregorianToHijri(day: number, month: number, year: number): { day: number; month: number; year: number } {
  console.log('gregorianToHijri');

  const gregorianDate = (moment as any)(`${year}-${month + 1}-${day}`, 'YYYY-M-D');

  return {
    day: gregorianDate.iDate(),
    month: gregorianDate.iMonth(),
    year: gregorianDate.iYear()
  };
}

  // Helper: Hijri to Julian Day Number
  private hijriToJulian(day: number, month: number, year: number): number {
    console.log('hijriToJulian')

    return Math.floor((11 * year + 3) / 30) +
      Math.floor(354 * year) +
      Math.floor(30 * month) -
      Math.floor((month - 1) / 2) +
      day + 1948440 - 385;
  }

  // Helper: Julian Day Number to Hijri
  private julianToHijri(jd: number): { day: number; month: number; year: number } {
    console.log('julianToHijri')

    const l = jd - 1948440 + 10632;
    const n = Math.floor((l - 1) / 10631);
    const l1 = l - 10631 * n + 354;
    const j = Math.floor((10985 - l1) / 5316) * Math.floor((50 * l1) / 17719) +
      Math.floor(l1 / 5670) * Math.floor((43 * l1) / 15238);
    const l2 = l1 - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
      Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
    const month = Math.floor((24 * l2) / 709);
    const day = l2 - Math.floor((709 * month) / 24);
    const year = 30 * n + j - 30;

    return { day, month: month - 1, year };
  }

  // Helper: Gregorian to Julian Day Number
  private gregorianToJulian(day: number, month: number, year: number): number {
    console.log('gregorianToJulian')

    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;
    return day + Math.floor((153 * m + 2) / 5) + 365 * y +
      Math.floor(y / 4) - Math.floor(y / 100) +
      Math.floor(y / 400) - 32045;
  }

  // Helper: Julian Day Number to Gregorian
  private julianToGregorian(jd: number): { day: number; month: number; year: number } {
    console.log('julianToGregorian')

    const a = jd + 32044;
    const b = Math.floor((4 * a + 3) / 146097);
    const c = a - Math.floor((146097 * b) / 4);
    const d = Math.floor((4 * c + 3) / 1461);
    const e = c - Math.floor((1461 * d) / 4);
    const m = Math.floor((5 * e + 2) / 153);
    const day = e - Math.floor((153 * m + 2) / 5) + 1;
    const month = m + 3 - 12 * Math.floor(m / 10);
    const year = 100 * b + d - 4800 + Math.floor(m / 10);

    return { day, month: month - 1, year };
  }



}
