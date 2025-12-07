import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  index?: number;
}

@Component({
  selector: 'app-hiijri-gregorian',
  imports: [FormsModule, ReactiveFormsModule, TagModule, CommonModule, TranslateModule],
  templateUrl: './hiijri-gregorian.component.html',
  styleUrl: './hiijri-gregorian.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HiijriGregorianComponent implements OnInit {
  @Output() onnDateSelect = new EventEmitter<SelectedDate>();
  correspondenceForm!: FormGroup;
  mode: 'hijri' | 'gregorian' = 'gregorian';
  selectedDate: SelectedDate | null = null;
  currentMonth = 10; // September (0-indexed)
  currentYear = 2020;
  showYearPicker = false;
  yearRangeStart = 2020;
  yearRangeEnd = 2031;
  calendarDays: CalendarDay[] = [];
  calenderSelectedDate!: CalendarDay;
  // Store the equivalent date in the other calendar
  equivalentDate: { month: number; year: number; day: number } | null = null;

  arabicDays = ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'];

  gregorianMonths = [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ];

  hijriMonths = [
    'محرم',
    'صفر',
    'ربيع الأول',
    'ربيع الثاني',
    'جمادى الأولى',
    'جمادى الآخرة',
    'رجب',
    'شعبان',
    'رمضان',
    'شوال',
    'ذو القعدة',
    'ذو الحجة',
  ];
  ngOnInit() {
    this.setTodayDate()
    this.generateCalendarDays();
  }


  setTodayDate() {
   const today = new Date();
    this.currentMonth = new Date().getMonth(); // 0-indexed (0 = Jan)
    this.currentYear = new Date().getFullYear();

    if (this.mode === 'hijri') {
      const hijriToday = this.gregorianToHijri(
        today.getDate(),
        today.getMonth(),
        today.getFullYear()
      );
      this.currentMonth = hijriToday.month;
      this.currentYear = hijriToday.year;
    }
  }

  getMonthName(): string {
    console.log('getMonthName');

    const months = this.mode === 'hijri' ? this.hijriMonths : this.gregorianMonths;
    return months[this.currentMonth];
  }
  getYearChunks(): number[][] {
    console.log('getYearChunks');

    const years = this.getYearRange();
    const chunks: number[][] = [];

    for (let i = 0; i < years.length; i += 2) {
      chunks.push(years.slice(i, i + 2));
    }

    return chunks;
  }
  getDaysInMonth(year: number, month: number): number {
    console.log('getDaysInMonth');

    return new Date(year, month + 1, 0).getDate();
  }

  getFirstDayOfMonth(year: number, month: number): number {
    console.log('getFirstDayOfMonth');

    return new Date(year, month, 1).getDay();
  }

  generateCalendarDays() {
    const daysInMonth = this.getDaysInMonth(this.currentYear, this.currentMonth);
    const firstDay = this.getFirstDayOfMonth(this.currentYear, this.currentMonth);
    const prevMonthDays = this.getDaysInMonth(this.currentYear, this.currentMonth - 1);

    const days: CalendarDay[] = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        isPrevMonth: true,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        isPrevMonth: false,
      });
    }

    // Next month days to fill the grid
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        isPrevMonth: false,
      });
    }

    this.calendarDays = days;
  }

  selectDate(dateObj: CalendarDay, index: number): void {
    if (!dateObj.isCurrentMonth) return;

    // Convert clicked date to Gregorian if current mode is Hijri
    const gregorianDate =
      this.mode === 'gregorian'
        ? { day: dateObj.day, month: this.currentMonth, year: this.currentYear }
        : this.hijriToGregorian(dateObj.day, this.currentMonth, this.currentYear);

    const hijriDate =
      this.mode === 'hijri'
        ? { day: dateObj.day, month: this.currentMonth, year: this.currentYear }
        : this.gregorianToHijri(dateObj.day, this.currentMonth, this.currentYear);

    this.selectedDate = {
      day: gregorianDate.day,
      month: gregorianDate.month,
      year: gregorianDate.year,
      gregorian: this.formatDate(gregorianDate, this.gregorianMonths),
      hijri: this.formatDate(hijriDate, this.hijriMonths),
    };

    // Update calendar to show selected month/year
    this.currentMonth = this.mode === 'gregorian' ? gregorianDate.month : hijriDate.month;
    this.currentYear = this.mode === 'gregorian' ? gregorianDate.year : hijriDate.year;
  }

  formatDate(date: { day: number; month: number; year: number }, months: string[]): string {
    console.log('formatDate');

    return `${date.day} ${months[date.month]} ${date.year}`;
  }

  isSelected(dateObj: CalendarDay): boolean {
    if (!this.selectedDate) return false;

    if (!dateObj.isCurrentMonth) return false;

    if (this.mode === 'gregorian') {
      return (
        dateObj.day === this.selectedDate.day &&
        this.currentMonth === this.selectedDate.month &&
        this.currentYear === this.selectedDate.year
      );
    } else {
      const hijri = this.gregorianToHijri(
        this.selectedDate.day,
        this.selectedDate.month,
        this.selectedDate.year
      );
      return (
        dateObj.day === hijri.day &&
        this.currentMonth === hijri.month &&
        this.currentYear === hijri.year
      );
    }
  }

  isToday(dateObj: CalendarDay): boolean {
    const today = new Date();

    if (this.mode === 'gregorian') {
      return (
        dateObj.day === today.getDate() &&
        this.currentMonth === today.getMonth() &&
        this.currentYear === today.getFullYear() &&
        dateObj.isCurrentMonth
      );
    } else {
      const hijriToday = this.gregorianToHijri(
        today.getDate(),
        today.getMonth(),
        today.getFullYear()
      );
      return (
        dateObj.day === hijriToday.day &&
        this.currentMonth === hijriToday.month &&
        this.currentYear === hijriToday.year &&
        dateObj.isCurrentMonth
      );
    }
  }

  switchMode(newMode: 'hijri' | 'gregorian'): void {
    if (this.mode === newMode) return;
    this.mode = newMode;

    if (!this.selectedDate) {
      this.setTodayDate()
      return;
    }
    let targetDate;
    if (newMode === 'gregorian') {
      // Convert stored Gregorian date to Gregorian (no change)
      targetDate = {
        day: this.selectedDate.day,
        month: this.selectedDate.month,
        year: this.selectedDate.year,
      };
    } else {
      // Convert stored Gregorian date to Hijri
      targetDate = this.gregorianToHijri(
        this.selectedDate.day,
        this.selectedDate.month,
        this.selectedDate.year
      );
    }

    this.currentMonth = targetDate.month;
    this.currentYear = targetDate.year;
  }

  trackByDay(index: number, day: CalendarDay) {
    return day.day + '-' + (day.isPrevMonth ? 'p' : 'c'); // unique key per day
  }

  prevMonth(): void {
    console.log('prevMonth');

    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }

    this.generateCalendarDays();
  }

  nextMonth(): void {
    console.log('nextMonth');

    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }

    this.generateCalendarDays();
  }

  toggleYearPicker(): void {
    console.log('toggleYearPicker');

    this.showYearPicker = !this.showYearPicker;
    if (this.showYearPicker) {
      // Center the current year in the range
      this.yearRangeStart = this.currentYear - 6;
      this.yearRangeEnd = this.currentYear + 5;
    }
  }

  getYearRange(): number[] {
    console.log('getYearRange');

    const years = [];
    for (let i = this.yearRangeStart; i <= this.yearRangeEnd; i++) {
      years.push(i);
    }
    return years;
  }

  selectYear(year: number): void {
    console.log('selectYear');

    this.currentYear = year;
    this.showYearPicker = false;
  }

  previousYearRange(): void {
    console.log('previousYearRange');

    this.yearRangeStart -= 12;
    this.yearRangeEnd -= 12;
  }

  nextYearRange(): void {
    console.log('nextYearRange');

    this.yearRangeStart += 12;
    this.yearRangeEnd += 12;
  }

  hijriToGregorian(
    day: number,
    month: number,
    year: number
  ): { day: number; month: number; year: number } {
    console.log('hijriToGregorian');

    const hijriDate = (moment as any)(`${year}-${month + 1}-${day}`, 'iYYYY-iM-iD');

    return {
      day: hijriDate.date(),
      month: hijriDate.month(),
      year: hijriDate.year(),
    };
  }

  gregorianToHijri(
    day: number,
    month: number,
    year: number
  ): { day: number; month: number; year: number } {
    console.log('gregorianToHijri');

    const gregorianDate = (moment as any)(`${year}-${month + 1}-${day}`, 'YYYY-M-D');

    return {
      day: gregorianDate.iDate(),
      month: gregorianDate.iMonth(),
      year: gregorianDate.iYear(),
    };
  }
}
