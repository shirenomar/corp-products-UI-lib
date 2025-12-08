export const WEEKDAYS = {
  ar: ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'],
  en: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
};

export const MONTHS = {
  ar: [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ],
  en: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]
};

export function getMonthName(lang: 'ar' | 'en', month: number) {
  return MONTHS[lang][month - 1];
}

export function getWeekdayName(lang: 'ar' | 'en', weekday: number) {
  return WEEKDAYS[lang][weekday - 1];
}
