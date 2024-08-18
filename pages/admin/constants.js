const KEYS_MENU_ITEMS = {
  organizations: 'organizations',
  entertainments: 'entertainments',
  entertainmentTypes: 'entertainmentTypes',
  users: 'users',
};

const MENU_ITEMS = [
  {
    label: 'Организации',
    key: KEYS_MENU_ITEMS.organizations,
  },
  {
    label: 'Мероприятия',
    key: KEYS_MENU_ITEMS.entertainments,
  },
  {
    label: 'Типы мероприятий',
    key: KEYS_MENU_ITEMS.entertainmentTypes,
  },
  {
    label: 'Пользователи',
    key: KEYS_MENU_ITEMS.users,
  },
];

export {
  MENU_ITEMS,
  KEYS_MENU_ITEMS,
};
