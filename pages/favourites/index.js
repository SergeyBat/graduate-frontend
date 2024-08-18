import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import Layout from 'src/components/shared/Layout';
import bem from 'src/utils/bem';
import moment from 'moment';
import companyActions from 'src/redux/company/actions';
import entertainmentsActions from 'src/redux/entertainments/actions';

import EventSmallCard from '@components/cards/EventSmallCard';
import {
  Button, ConfigProvider, DatePicker, Select,
} from 'antd';
import locale from 'antd/locale/ru_RU';
import styles from './index.module.scss';
import CustomInput from '../../src/components/inputs/CustomInput';
import { AGE_RESTRICTION } from '../../src/constants';

const {
  getCompanyEntertainments,
} = companyActions;
const {
  getEventTypes,
} = entertainmentsActions;

const b = bem('entertainments-filters', styles);

const EntertainmentsFilters = (props) => {
  const [inputValues, changeInputValues] = useState({});
  const {
    getEventList,
    companyEntertainments,
    getEventTypesList,
    eventTypes,
  } = props;

  useEffect(() => {
    getEventList();
    getEventTypesList();
  }, []);

  const handleChange = (key, value) => {
    const newValues = {
      ...inputValues,
      [key]: value,
    };
    changeInputValues(newValues);
  };

  return (
    <Layout className={b('')} navColor="purple">
      <div className={b('filter')}>
        <div className={b('filter-select-wrapper')}>
          <span className={b('select-title')}>Возрастное ограничение</span>
          <Select
            className={b('filter-select')}
            allowClear
            options={AGE_RESTRICTION}
          />
        </div>
        <div className={b('filter-select-wrapper')}>
          <span className={b('select-title')}>Категория</span>
          <Select
            className={b('filter-select')}
            allowClear
            options={eventTypes.map(({ id, description }) => ({ value: id, label: description }))}
          />
        </div>
        <div className={b('filter-select-wrapper')}>
          <span className={b('select-title')}>Город</span>
          <CustomInput
            className={b('filter-input')}
            onChange={({ target: { value } }) => handleChange('city', value)}
            value={inputValues.city}
          />
        </div>
        <div className={b('filter-select-wrapper')}>
          <span className={b('select-title')}>Дата</span>
          <ConfigProvider locale={locale}>
            <DatePicker
              className={b('filter-date-picker')}
              format="DD-MM-YYYY"
              onOk={(e) => {
                const newDate = new Date(e);
                console.log('=>(index.js:75) newDate', newDate);
                // setFieldValue('startDate', newDate);
              }}
              // value={dayjs(startDate)}
            />
          </ConfigProvider>
        </div>
        <div className={b('filter-select-wrapper')}>
          <span className={b('select-title')}>Цена</span>
          <CustomInput
            className={b('filter-input')}
            onChange={({ target: { value } }) => handleChange('price', value)}
            value={inputValues.price}
          />
        </div>
        <div className={b('filter-select-wrapper')}>
          <Button
            className={b('filter-btn')}
            onClick={() => {}}
          >
            Найти
          </Button>
        </div>
      </div>
      <div className={b('list-wrapper')}>
        {companyEntertainments?.length && companyEntertainments.map((item) => (
          <EventSmallCard event={item} eventTypes={eventTypes} />
        ))}
      </div>
    </Layout>
  );
};

const stateProps = (state) => ({
  companyEntertainments: state.company.companyEntertainments,
  eventTypes: state.entertainments.eventTypes,
});

const actions = {
  getEventList: getCompanyEntertainments,
  getEventTypesList: getEventTypes,
};

export default connect(stateProps, actions)(EntertainmentsFilters);
