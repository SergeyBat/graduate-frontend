import React, { useEffect, useState } from 'react';
import LayoutManager from 'src/components/shared/LayoutManager';
import { Menu } from 'antd';
import bem from 'src/utils/bem';
import actions from 'src/redux/company/actions/index';
import MyCompanyMainInfo from 'src/components/MyCompanyMainInfo/indes';
import { connect } from 'react-redux';
import CompanyEvents from 'src/components/CompanyEvents';
import styles from './index.module.scss';
import {
  MENU_ITEMS,
  KEYS_MENU_ITEMS,
} from './constants';

const b = bem('my-company', styles);

const MyCompany = () => {
  const [selectedTab, selectTab] = useState(MENU_ITEMS[0].key);

  const getInfoSelectedTab = () => {
    if (selectedTab === KEYS_MENU_ITEMS.entertainments) {
      return (
        <CompanyEvents />
      );
    }
    if (selectedTab === KEYS_MENU_ITEMS.mainInfo) {
      return (
        <MyCompanyMainInfo />
      );
    }
    return null;
  };

  return (
    <LayoutManager className={b('')} navColor="scooter">
      <Menu
        className={b('menu')}
        onClick={({ key }) => selectTab(key)}
        defaultSelectedKeys={selectedTab}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={MENU_ITEMS}
      />
      <div className={b('content')}>
        {getInfoSelectedTab()}
      </div>
    </LayoutManager>
  );
};

const mapStateToProps = ({ company }) => ({ ...company });

export default connect(null, actions)(MyCompany);
