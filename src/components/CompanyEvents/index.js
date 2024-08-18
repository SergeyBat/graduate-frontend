import React, { useEffect, useState } from 'react';
import bem from 'src/utils/bem';
import { Button, Menu, Table } from 'antd';
import actions from 'src/redux/company/actions/index';
import actionsEntertainments from 'src/redux/entertainments/actions/index';
import moment from 'moment';
import EditorEvents from '@components/elements/EditorEvents';
import { connect } from 'react-redux';
import styles from './index.module.scss';

import {
  MENU_ITEMS,
  KEYS_MENU_ITEMS,
  COLUMNS,
  NAME,
  COLUMNS_REQUESTS,
} from './constants';

const b = bem('company-events', styles);

const CompanyEvents = (props) => {
  const {
    selectedCompany,
    getCompanyEntertainmentsFilters,
    getEventRequests,
    clearEventRequests,
    companyEntertainments,
    eventRequests,
    getEventTypes,
  } = props;

  useEffect(() => {
    const filters = {
      'filters[companyId]': selectedCompany.id,
    };
    getCompanyEntertainmentsFilters(filters);
    getEventTypes();
  }, []);

  const [selectedTab, selectTab] = useState(KEYS_MENU_ITEMS.eventRequests);
  const [selectedEvent, selectEvent] = useState(null);
  const [selectedDate, setDate] = useState('');
  const [selectedTime, setTime] = useState('');
  const [isEditorEvent, setEditorEvent] = useState(false);
  const [changeableEvent, setChangeableEvent] = useState({});

  const onDelete = (id) => {
  };

  const getSelectedEventRequests = (event) => {
    const { id: eventDateId } = event;
    setTime(event);
    getEventRequests({ eventDateId });
  };

  const {
    name,
    dates,
  } = selectedEvent || {};
  const newDateList = dates?.length && [...(new Set(dates?.map(({ startDate }) => moment(startDate).format('L')) || []))];
  const getTimeList = () => {
    const timeList = dates.filter(({ startDate }) => selectedDate === moment(startDate).format('L'));
    return timeList.map((item) => (
      <Button
        className={b('time')}
        onClick={() => getSelectedEventRequests(item)}
      >
        {moment(item.startDate).format('HH:mm')}
      </Button>
    ));
  };

  const onApproveRequest = () => {};
  const editEvent = (event) => {
    setChangeableEvent(event);
    setEditorEvent(true);
  };

  return (
    <div className={b('')}>
      {/* eslint-disable-next-line no-nested-ternary */}
      {isEditorEvent ? (
        <EditorEvents
          onCancel={() => setEditorEvent(false)}
          changeableEvent={changeableEvent}
          setChangeableEvent={setChangeableEvent}
        />
      ) : (
        selectedEvent ? (
          <div className={b('selected-event-wrapper')}>
            <Button onClick={() => selectEvent(null)}>Назад</Button>
            <div className={b('event-info')}>
              <Menu
                className={b('menu')}
                onClick={({ key }) => selectTab(key)}
                defaultSelectedKeys={selectedTab}
                mode="horizontal"
                items={MENU_ITEMS}
              />
              <div className={b('content')}>
                {selectedTab && selectedTab === KEYS_MENU_ITEMS.mainInfo
                  ? (
                    <div className={b('company-info-wrapper')}>
                      <div className={b('company-info-row')}>
                        <div className={b('title')}>{NAME}</div>
                        <div className={b('description')}>{name}</div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className={b('date-wrapper')}>
                        {newDateList?.length && newDateList.map((date) => (
                          <Button
                            className={b('date')}
                            onClick={() => {
                              setDate(date);
                              setTime('');
                              clearEventRequests();
                            }}
                          >
                            {date}
                          </Button>
                        ))}
                      </div>
                      <div className={b('time-wrapper')}>
                        {getTimeList()}
                      </div>
                      <Table
                        title={selectedTime && Object.keys(selectedTime).length
                          ? () => `${selectedEvent.name} ${moment(selectedTime.startDate).format('L HH:mm')}`
                          : undefined}
                        columns={COLUMNS_REQUESTS(onApproveRequest)}
                        dataSource={eventRequests}
                      />
                    </>
                  )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <Button
              onClick={() => setEditorEvent(true)}
            >
              Добавить мероприятие
            </Button>
            <Table
              className={b('table')}
              columns={COLUMNS(
                onDelete,
                (value) => {
                  selectEvent(value);
                  setTime('');
                  clearEventRequests();
                },
                editEvent,
                b,
              )}
              dataSource={companyEntertainments}
              borderRadius={25}
            />
          </>
        )

      )}
    </div>
  );
};

const mapStateToProps = ({
  company,
  entertainments,
}) => ({
  ...company,
  ...entertainments,
});

export default connect(mapStateToProps, {
  ...actions,
  ...actionsEntertainments,
})(CompanyEvents);
