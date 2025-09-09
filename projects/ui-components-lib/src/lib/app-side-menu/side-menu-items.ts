import { ROUTES_NAME } from './routes-names';
import { SideMenuItem } from './side-menu';

export const BASE_SIDE_MENU_ITEMS: SideMenuItem[] = [
  {
    label: 'الإجتماعات',
    icon: 'font-icon-menu-board',
    link: ROUTES_NAME['meetings'].name
  },
  {
    label: 'اللجان و المجالس',
    icon: 'font-icon-people',
    link: ROUTES_NAME['board'].name
  },
  // {
  //   label: 'المستخدمين',
  //   icon: 'font-icon-profile-2user',
  //   link: ROUTES_NAME['users'].name,
  // },
  // {
  //   label: 'الإجتماعات',
  //   icon: 'font-icon-menu-board',
  //   link: ROUTES_NAME['meetings'].name,
  // },
  // {
  //   label: 'مهامي',
  //   icon: 'font-icon-task-square',
  //   link: ROUTES_NAME['tasks'].name,
  // },
  // {
  //   label: 'الوارد',
  //   icon: 'font-icon-directbox-receive',
  //   link: ROUTES_NAME['imported'].name,
  // },
  // {
  //   label: 'الصادر',
  //   icon: 'font-icon-directbox-send',
  //   link: ROUTES_NAME['exported'].name,
  // },
  // {
  //   label: 'التقارير',
  //   icon: 'font-icon-status-up',
  //   link: ROUTES_NAME['reports'].name,
  // },
];
