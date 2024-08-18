import React, { useEffect, useState } from 'react';
import LayoutManager from 'src/components/shared/LayoutManager';
import { Menu } from 'antd';
import AdminContent from 'src/Pages/AdminContent';
import bem from 'src/utils/bem';
import actions from 'src/redux/admin/actions/index';
import { connect } from 'react-redux';
import eventActions from 'src/redux/entertainments/actions';
import { MENU_ITEMS } from './constants';
import styles from './index.module.scss';

const b = bem('admin', styles);

const Admin = (props: any) => {
  const {
    getAllCompanies,
    getAllEntertainments,
    getAllUsers,
    getEventTypes,
  } = props;

  const [isLoadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    setLoadingPage(true);
  }, []);
  const [selectedTab, selectTab] = useState(MENU_ITEMS[0].key);
  useEffect(() => {
    if (isLoadingPage) {
      getAllCompanies();
      getAllEntertainments();
      getAllUsers();
      getEventTypes();
    }
  }, [isLoadingPage]);

  return (
    <LayoutManager className={b('')} navColor="scooter">
      <Menu
        className={b('menu')}
        onClick={({ key }) => selectTab(key)}
        defaultSelectedKeys={[selectedTab]}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={MENU_ITEMS}
      />
      <div className={b('content')}>
        <AdminContent selectedTab={selectedTab} />
      </div>
    </LayoutManager>
  );
};

export default connect(null, {
  ...actions,
  ...eventActions,
})(Admin);
