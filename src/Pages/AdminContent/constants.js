import { Button } from 'antd';
import React from 'react';

const INC = 'increment';
const DEC = 'decrement';

const COLUMNS_ENTERTAINMENTS = (onDelete, selectEvent, bem) => (
  [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Статус',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      render: (_, {
        isDeleted,
      }) => (
        <div style={{
          width: 'fit-content',
          height: '100%',
          display: 'flex',
          padding: '4px 9px',
          borderRadius: '15px',
          userSelect: 'none',
          backgroundColor: (!isDeleted ? '#077e87' : '#f34744'),
        }}
        >
          {!isDeleted ? 'Проводится' : 'Удалено'}
        </div>
      ),
    },
    {
      title: 'Действия',
      dataIndex: 'edit',
      key: 'edit',
      render: (_, item) => (
        <div className={bem('event-wrap')}>
          <Button onClick={() => selectEvent(`/entertainment/${item.id}`)}>Перейти</Button>
          <Button
            onClick={() => onDelete(item.id, { isDeleted: !item.isDeleted })}
          >
            Удалить
          </Button>
        </div>
      ),

    },
  ]
);

const COLUMNS_ORGANIZATIONS = (changeApprovedCompany, deleteCompany, onGoToCompany, bem) => (
  [
    {
      title: 'Название организации',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Город',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Статус',
      dataIndex: 'approvedOrDeleted',
      key: 'approvedOrDeleted',
      render: (_, {
        approved,
        isDeleted,
      }) => {
        const isApprovedColor = approved ? '#077e87' : '#f29339';
        const isApprovedText = approved ? 'Подтверждена' : 'Ждет подтверждения';
        return (
          <div style={{
            width: 'fit-content',
            height: '100%',
            display: 'flex',
            padding: '4px 9px',
            borderRadius: '15px',
            userSelect: 'none',
            backgroundColor: (!isDeleted ? isApprovedColor : '#f34744'),
          }}
          >
            {!isDeleted ? isApprovedText : 'Удалена'}
          </div>
        );
      },
    },
    {
      title: 'Действия',
      dataIndex: 'edit',
      key: 'edit',
      render: (_, item) => {
        const isApprovedText = item.approved ? 'Удалить' : 'Отклонить';
        return (
          <div className={bem('event-wrap')}>
            <Button onClick={() => onGoToCompany(`company/${item.id}`)}>Подробнее</Button>
            {!item.isDeleted && !item.approved && (
              <Button onClick={() => changeApprovedCompany(item)}>Одобрить</Button>
            )}
            <Button onClick={() => deleteCompany(item)}>
              {item.isDeleted ? 'Востановить' : isApprovedText}
            </Button>
          </div>
        );
      },
    },
  ]
);

const COLUMNS_USERS = (changeUserRole, bem) => (
  [
    {
      title: 'Имя',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (_, item) => (item.firstName),
    },
    {
      title: 'Фамилия',
      dataIndex: 'lastName',
      key: 'lastName',
      render: (_, item) => (item.lastName),
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
      render: (_, item) => (item.role),
    },
    {
      title: 'организация',
      dataIndex: 'companyId',
      key: 'companyId',
      render: (_, item) => (item.companyId),
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'email',
      render: (_, item) => (item.email),
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
      render: (_, item) => (item.phone),
    },
    {
      title: 'Действия',
      dataIndex: 'edit',
      key: 'edit',
      render: (_, item) => (
        <div className={bem('event-wrap')}>
          {(item.roleId !== 3 && item.roleId !== 1) && (
            <Button
              onClick={() => changeUserRole(item, DEC)}
            >
              Понизить
            </Button>
          )}
          {(item.roleId !== 2 && item.roleId !== 1) && (
            <Button
              onClick={() => changeUserRole(item, INC)}
            >
              Повысить
            </Button>
          )}
        </div>
      ),
    },
  ]
);

const COLUMNS_ENTERTAINMENT_TYPES = (changeEventTypeImg, deleteEventType, bem) => (
  [
    {
      title: 'Категория',
      dataIndex: 'description',
      key: 'description',
      render: (_, item) => (item.description),
    },
    {
      title: 'Статус',
      dataIndex: 'approvedOrDeleted',
      key: 'approvedOrDeleted',
      render: (_, {
        isDeleted,
      }) => (
        <div style={{
          width: 'fit-content',
          height: '100%',
          display: 'flex',
          padding: '4px 9px',
          borderRadius: '15px',
          userSelect: 'none',
          backgroundColor: (!isDeleted ? '#077e87' : '#f34744'),
        }}
        >
          {!isDeleted ? 'Доступна' : 'Заблокирована'}
        </div>
      ),
    },
    {
      title: 'Действия',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, item) => (
        <div className={bem('event-wrap')}>
          <Button
            onClick={() => changeEventTypeImg(item)}
          >
            Изменить изображение
          </Button>
          <Button
            onClick={() => deleteEventType(item)}
          >
            {item.isDeleted ? 'Востановить' : 'Заблокировать' }
          </Button>
        </div>
      ),
    },
  ]
);

const NAME = 'Название:';

export {
  COLUMNS_ENTERTAINMENTS,
  COLUMNS_ENTERTAINMENT_TYPES,
  COLUMNS_ORGANIZATIONS,
  COLUMNS_USERS,
  NAME,
  INC,
  DEC,
};
