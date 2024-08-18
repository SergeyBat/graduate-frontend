const LINKS = [
  {
    path: '/entertainments',
    title: 'Мероприятия',
  },
  {
    path: '/companies',
    title: 'Организации',
  },
  {
    path: '/favourites',
    title: 'Избранное',
  },
];

const USER_LINKS = [
  {
    path: '/profile',
    title: 'Профиль',
  },
  {
    path: '/my-company',
    title: 'Моя организация',
    forManager: true,
  },
  {
    path: '/admin',
    title: 'Панель Администратора',
    forAdmin: true,
  },
  {
    title: 'Выйти',
    isLogoutBtn: true,
  },
];

export default {
  LINKS,
  USER_LINKS,
};
