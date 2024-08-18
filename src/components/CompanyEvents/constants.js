import { Button } from 'antd';
import React from 'react';

const KEYS_MENU_ITEMS = {
  mainInfo: 'mainInfo',
  eventRequests: 'eventRequests',
};

const MENU_ITEMS = [
  {
    label: 'Записи',
    key: KEYS_MENU_ITEMS.eventRequests,
  },
];

const COLUMNS = (onDelete, selectEvent, editEvent, bem) => (
  [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      render: (_, item) => <Button onClick={() => selectEvent(item)}>{item.name}</Button>,
    },
    {
      title: 'Действия',
      dataIndex: 'edit',
      key: 'edit',
      render: (_, item) => (
        <div className={bem('event-wrap')}>
          <Button onClick={() => editEvent(item)}>Редактировать</Button>
          <Button onClick={() => onDelete(item)}>Удалить</Button>
        </div>
      ),

    },
  ]
);

const COLUMNS_REQUESTS = (onApproveRequest) => ([
  {
    title: 'Имя',
    dataIndex: 'firstName',
    key: 'firstName',
    render: (_, item) => (item.user.firstName),
  },
  {
    title: 'Фамилия',
    dataIndex: 'lastName',
    key: 'lastName',
    render: (_, item) => (item.user.lastName),
  },
  {
    title: 'Почта',
    dataIndex: 'email',
    key: 'email',
    render: (_, item) => (item.user.email),
  },
  {
    title: 'Телефон',
    dataIndex: 'phone',
    key: 'phone',
    render: (_, item) => (item.user.phone),
  },
  {
    title: 'Кол-во человек',
    dataIndex: 'numberPeople',
    key: 'numberPeople',
  },
  {
    title: 'Статус заявки',
    dataIndex: 'approved',
    key: 'approved',
    render: (_, item) => (
      <Button
        onClick={() => onApproveRequest(item)}
      >
        Отклонить
      </Button>
    ),
  },
]);

const NAME = 'Название:';

export {
  MENU_ITEMS,
  KEYS_MENU_ITEMS,
  COLUMNS,
  NAME,
  COLUMNS_REQUESTS,
};
