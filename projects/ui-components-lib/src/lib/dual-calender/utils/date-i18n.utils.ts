export const WEEKDAYS = {
  ar: ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'],
  en: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
};

export const MONTHS_GREGORIAN = {
  ar: [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ],
  en: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]
};

export const MONTHS_HIJRI = {
  ar: [
    'محرم',
    'صفر',
    'ربيع الأول',
    'ربيع الآخر',
    'جمادى الأولى',
    'جمادى الآخرة',
    'رجب',
    'شعبان',
    'رمضان',
    'شوال',
    'ذو القعدة',
    'ذو الحجة'
  ],
  en: [
    'Muharram',
    'Safar',
    'Rabi Al-Awwal',
    'Rabi Al-Thani',
    'Jumada Al-Awwal',
    'Jumada Al-Thani',
    'Rajab',
    'Shaaban',
    'Ramadan',
    'Shawwal',
    'Dhul-Qi’dah',
    'Dhul-Hijjah'
  ]
};

export function getGregorianMonthName(lang: 'ar' | 'en', month: number) {
  return MONTHS_GREGORIAN[lang][month - 1] || '';
}

export function getHijriMonthName(lang: 'ar' | 'en', month: number) {
  return MONTHS_HIJRI[lang][month - 1] || '';
}

export function getWeekdayName(lang: 'ar' | 'en', weekday: number) {
  return WEEKDAYS[lang][weekday - 1];
}
