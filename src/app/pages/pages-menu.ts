import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Loan Offers',
    icon: 'pricetags-outline',
    children: [
      {
        title: 'Manage Offers',
        link: '/pages/loan-offers/list',
        home: true,
      },
      {
        title: 'Add Offer',
        link: '/pages/loan-offers/add',
      },
    ],
  },
  {
    title: 'Loans',
    icon: 'list',
    children: [
      {
        title: 'Manage Loans',
        link: '/pages/loans/list',
      },
    ],
  },
];
