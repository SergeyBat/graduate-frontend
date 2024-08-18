import React, { useState } from 'react';
import bem from 'src/utils/bem';
import {
  Button, Modal, Table, Upload,
} from 'antd';
import actions from '@redux/admin/actions/index';
import { ICompany } from 'src/interfaces';
import { KEYS_MENU_ITEMS } from 'pages/admin/constants';
import { connect } from 'react-redux';
import Portal from 'src/HOC/Portal';
import CustomInput from '@components/inputs/CustomInput';
import filesActions from 'src/redux/files/actions';
import { UploadOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import styles from './index.module.scss';

import {
  COLUMNS_ORGANIZATIONS,
  COLUMNS_ENTERTAINMENT_TYPES,
  COLUMNS_ENTERTAINMENTS,
  COLUMNS_USERS,
  DEC,
} from './constants';

const b = bem('company-events', styles);

const AdminContent = (props: any): JSX.Element => {
  const {
    selectedTab,
    companiesList,
    entertainments,
    usersList,
    changeUserRole,
    changeCompany,
    eventTypes,
    changeEventTypes,
    uploadImage,
    createEventTypes,
    deleteEntertainments,
  } = props;

  const router = useRouter();

  const [isOpenModal, setOpenModal] = useState(false);
  const [isNewType, setIsNewType] = useState(true);
  const [selectedType, setSelectedType] = useState(null);
  const [typeBeingCreated, setTypeBeingCreated] = useState('');
  const [descriptionBeingCreatedType, setDescriptionBeingCreatedType] = useState('');
  const [imageBeingCreatedType, setImageBeingCreatedType] = useState('');

  const onUploadImage = (data: any) => {
    uploadImage(
      data,
      setImageBeingCreatedType,
      () => {},
    );
  };

  const onChangeUserRole = (user: any, value: string) => {
    const newRole = {
      roleId: value === DEC ? user.roleId + 1 : user.roleId - 1,
    };
    changeUserRole(user.id, newRole);
  };

  const changeApprovedCompany = (company: ICompany) => {
    const changedCompany = {
      approved: true,
    };
    changeCompany(company.id, changedCompany);
  };

  const deleteCompany = (company: ICompany) => {
    const changedCompany = {
      isDeleted: !company.isDeleted,
    };
    changeCompany(company.id, changedCompany);
  };

  const changeDeleteStatusEventType = (item: any) => {
    const { id, ...itemWithoutId } = item;
    const newItem = {
      ...itemWithoutId,
      isDeleted: !item.isDeleted,
    };
    changeEventTypes(id, newItem);
  };
  const onCloseModalPopUp = () => {
    setOpenModal(false);
    setTypeBeingCreated('');
    setDescriptionBeingCreatedType('');
    setImageBeingCreatedType('');
    setIsNewType(true);
  };

  const changeEventTypeImg = (item: any) => {
    const {
      type = '',
      description = '',
      imageKey = '',
    } = item;
    setSelectedType(item);
    setTypeBeingCreated(type);
    setDescriptionBeingCreatedType(description);
    setIsNewType(false);
    setOpenModal(true);
  };

  const onSubmitFormTypeEvent = () => {
    if (isNewType) {
      const newType = {
        type: typeBeingCreated,
        description: descriptionBeingCreatedType,
        imageKey: imageBeingCreatedType,
      };
      createEventTypes(newType);
    } else {
      const {
        id,
        type,
        description,
        imageKey,
        isDeleted,
      }: any = selectedType;
      const changedType = {
        type,
        description,
        imageKey: imageBeingCreatedType || imageKey,
        isDeleted,
      };
      changeEventTypes(id, changedType);
    }
    onCloseModalPopUp();
  };

  return (
    <div className={b('')}>
      {selectedTab === KEYS_MENU_ITEMS.entertainments && (
        <Table
          className={b('table')}
          size="middle"
          columns={COLUMNS_ENTERTAINMENTS(
            deleteEntertainments,
            (path: string) => router.push(path),
            b,
          )}
          dataSource={entertainments || []}
        />
      )}
      {selectedTab === KEYS_MENU_ITEMS.users && (
        <Table
          className={b('table')}
          size="middle"
          columns={COLUMNS_USERS(
            onChangeUserRole,
            b,
          )}
          dataSource={usersList || []}
        />
      )}
      {selectedTab === KEYS_MENU_ITEMS.organizations && (
        <Table
          className={b('table')}
          size="middle"
          columns={COLUMNS_ORGANIZATIONS(
            changeApprovedCompany,
            deleteCompany,
            (path: string) => router.push(path),
            b,
          )}
          dataSource={companiesList || []}
        />
      )}
      {selectedTab === KEYS_MENU_ITEMS.entertainmentTypes && (
        <>
          <Button
            className={b('add-type-btn')}
            onClick={() => setOpenModal(true)}
          >
            Добавить тип мероприятия
          </Button>
          <Table
            className={b('table')}
            size="middle"
            columns={COLUMNS_ENTERTAINMENT_TYPES(
              changeEventTypeImg,
              changeDeleteStatusEventType,
              b,
            )}
            dataSource={eventTypes || []}
          />
        </>
      )}
      <Portal>
        <Modal
          open={isOpenModal}
          onCancel={onCloseModalPopUp}
          footer={null}
        >
          <form className={b('modal-form')} name="createEventType" onSubmit={() => {}}>
            <Upload
              name="type-event"
              className={b('uploader-wrapper')}
              action=""
              maxCount={1}
              onChange={(uploadData) => {
                onUploadImage(uploadData);
              }}
              beforeUpload={() => false}
              showUploadList={{ showPreviewIcon: false, showRemoveIcon: false }}
            >
              {!imageBeingCreatedType
                && <Button icon={<UploadOutlined />}>Нажмите для загрузки изображения</Button>}
            </Upload>
            <CustomInput
              className={b('input-wrapper')}
              inputClass={b('input')}
              onChange={({ target: { value } }) => { setTypeBeingCreated(value); }}
              name="type"
              placeholder="Название типа латиницей без пробелов"
              value={typeBeingCreated}
              disabled={!isNewType}
            />
            <CustomInput
              className={b('input-wrapper')}
              inputClass={b('input')}
              onChange={({ target: { value } }) => { setDescriptionBeingCreatedType(value); }}
              name="type"
              placeholder="Название типа кириллицей"
              value={descriptionBeingCreatedType}
              disabled={!isNewType}
            />
            <Button
              onClick={onSubmitFormTypeEvent}
              className={b('modal-form-button')}
            >
              {isNewType ? 'Создать' : 'Сохранить'}
            </Button>
          </form>
        </Modal>
      </Portal>
    </div>
  );
};

const mapStateToProps = ({
  admin,
  entertainments,
}: any) => ({
  ...admin,
  ...entertainments,
});

export default connect(mapStateToProps, {
  ...actions,
  ...filesActions,
})(AdminContent);
