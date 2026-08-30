import { MONTHS_GREGORIAN, MONTHS_HIJRI } from './date-i18n.utils';
import { NgbCalendarIslamicUmalqura, NgbDate } from '@ng-bootstrap/ng-bootstrap';

function parseIsoDate(value: string): Date | null {
  debugger;
  const isoMatch = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (isoMatch) {
    const date = new Date(+isoMatch[1], +isoMatch[2] - 1, +isoMatch[3]);
    return isValidDate(date, +isoMatch[1], +isoMatch[2], +isoMatch[3]) ? date : null;
  }

  const slashMatch = value.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
  if (slashMatch) {
    const date = new Date(+slashMatch[1], +slashMatch[2] - 1, +slashMatch[3]);
    return isValidDate(date, +slashMatch[1], +slashMatch[2], +slashMatch[3]) ? date : null;
  }

  return null;
}

function isValidDate(date: Date, year: number, month: number, day: number): boolean {
  return (
    !isNaN(date.getTime()) &&
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function findMonthIndex(monthName: string): number {
  const normalized = monthName.trim().toLowerCase();
  for (const months of Object.values(MONTHS_GREGORIAN)) {
    const index = months.findIndex((m) => m.toLowerCase() === normalized);
    if (index !== -1) {
      return index + 1;
    }
  }
  return -1;
}

function parseDmyDate(value: string): Date | null {
  debugger;
  const match = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!match) {
    return null;
  }
  const day = +match[1];
  const month = +match[2];
  const year = +match[3];
  const date = new Date(year, month - 1, day);
  return isValidDate(date, year, month, day) ? date : null;
}

function parseGregorianDisplay(value: string): Date | null {
  debugger;
  const match = value.trim().match(/^(\d{1,2})\s+(.+?)\s+(\d{4})$/);
  if (!match) {
    return null;
  }

  const day = +match[1];
  const month = findMonthIndex(match[2]);
  const year = +match[3];

  if (month === -1) {
    return null;
  }

  const date = new Date(year, month - 1, day);
  return isValidDate(date, year, month, day) ? date : null;
}

function findHijriMonthIndex(monthName: string): number {
  const normalized = monthName.trim().toLowerCase();
  for (const months of Object.values(MONTHS_HIJRI)) {
    const index = months.findIndex((m) => m.toLowerCase() === normalized);
    if (index !== -1) {
      return index + 1;
    }
  }
  return -1;
}

function parseHijriDisplay(value: string): Date | null {
  const match = value.trim().match(/^(\d{1,2})\s+(.+?)\s+(\d{4})$/);
  if (!match) {
    return null;
  }

  const day = +match[1];
  const month = findHijriMonthIndex(match[2]);
  const year = +match[3];

  if (month === -1) {
    return null;
  }

  const hijriCal = new NgbCalendarIslamicUmalqura();
  const greg = hijriCal.toGregorian(new NgbDate(year, month, day));
  if (isNaN(greg.getTime())) {
    return null;
  }
  return greg;
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function parseManualDateInput(value: string, _lang: 'ar' | 'en', previousGregorian?: Date | null): Date | null {
  const trimmed = value?.trim();
  if (!trimmed) {
    return null;
  }

  if (trimmed.includes(' - ')) {
    const [gregPart, hijriPart] = trimmed.split(' - ').map(s => s.trim());

    const gregResult = parseIsoDate(gregPart) ?? parseDmyDate(gregPart) ?? parseGregorianDisplay(gregPart);
    const hijriResult = parseHijriDisplay(hijriPart);

    if (gregResult && hijriResult) {
      if (sameDay(gregResult, hijriResult)) {
        return gregResult;
      }
      // Dates disagree — the user edited one side. Return whichever differs from the previous value.
      if (previousGregorian) {
        const gregChanged = !sameDay(gregResult, previousGregorian);
        const hijriChanged = !sameDay(hijriResult, previousGregorian);
        if (gregChanged && !hijriChanged) return gregResult;
        if (hijriChanged && !gregChanged) return hijriResult;
      }
      // Both changed or no previous — prefer Gregorian
      return gregResult;
    }

    return gregResult ?? hijriResult;
  }

  return parseIsoDate(trimmed) ?? parseDmyDate(trimmed) ?? parseGregorianDisplay(trimmed);
}
