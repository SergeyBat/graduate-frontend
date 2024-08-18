import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import Layout from 'src/components/shared/Layout';
import bem from 'src/utils/bem';
import entertainmentsActions from 'src/redux/entertainments/actions';
import companyActions from 'src/redux/company/actions';
import EventBigCard from 'src/components/cards/EventBigCard';
import moment from 'moment';
import EventSmallCard from 'src/components/cards/EventSmallCard';
import ymaps from 'src/components/cards/EventSmallCard';

import { Button } from 'antd';
import styles from './index.module.scss';

const b = bem('entertainment', styles);

const {
  getCompanyEntertainments,
} = companyActions;

const {
  getEventInfo,
  getEventTypes,
  eventRequest,
} = entertainmentsActions;

const Entertainment = (props) => {
  const router = useRouter();
  const { id } = router.query;

  const {
    // getEventDetails,
    // eventInfo,
    getEventTypesList,
    eventTypes,
    getEventList,
    companyEntertainments,
    addRequest,
    userId,
  } = props;

  useEffect(() => {
    // getEventDetails(id);
    getEventTypesList();
    getEventList();
  }, []);
  const eventInfo = companyEntertainments.find((item) => Number(item.id) === Number(id)) || {};

  const getTopEvents = useMemo(() => (
    <div className={b('events')}>
      <div className={b('events-title')}>Выбирают</div>
      <div className={b('events-list')}>
        {
          companyEntertainments.map((
            event,
            index,
          ) => (index < 3 ? <EventSmallCard event={event} eventTypes={eventTypes} /> : null))
        }
      </div>
    </div>
  ), [companyEntertainments, eventTypes]);

  return (
    <Layout className={b('')} navColor="purple">
      <div className={b('top-block')}>
        <EventBigCard event={eventInfo} eventTypes={eventTypes} isInfo />
      </div>
      <div className={b('middle-block')}>
        <div className={b('middle-block-title')}>{eventInfo.name}</div>
        <div className={b('middle-block-button')}>Купить билеты</div>
      </div>
      <div className={b('bottom-block')}>
        <div className={b('bottom-block-title')}>Расписание</div>
        <div className={b('bottom-block-list')}>
          <div className={b('date-wrap', { center: true })}>
            <div className={b('start-date')}>Начало мероприятия</div>
            <div className={b('end-date')}>Конец мероприятия</div>
            <div className={b('count')}>Осталось мест</div>
            <div className={b('price')}>Цена</div>
            {
              userId ? (
                <div className={b('get-event')} />
              ) : null
            }
          </div>
          {
            eventInfo && eventInfo.dates ? eventInfo.dates.map((item) => (
              <div className={b('date-wrap')}>
                <div className={b('start-date')}>{moment(item.startDate).format('DD-MM-YYYY hh:mm')}</div>
                <div className={b('end-date')}>{moment(item.endDate).format('DD-MM-YYYY hh:mm')}</div>
                <div className={b('count')}>{eventInfo.limitUsers}</div>
                <div className={b('price')}>{`От ${eventInfo.price}р.`}</div>
                {
                  userId ? (
                    <div
                      className={b('get-event')}
                      role="button"
                      onClick={() => {
                        addRequest({
                          event: {
                            eventId: item.eventId,
                            eventDateId: item.id,
                            numberPeople: 1,
                          },
                          getEventList,
                        });
                      }}
                    >
                      Забронировать
                    </div>
                  ) : null
                }
              </div>
            )) : null
          }
        </div>
      </div>
      <Button
        style={{ margin: '20px 0 0' }}
      >
        Добавить в избранное
      </Button>
      <div className={b('list')}>{getTopEvents}</div>
    </Layout>
  );
};

const stateProps = (state) => ({
  eventInfo: state.entertainments.eventInfo,
  eventTypes: state.entertainments.eventTypes,
  companyEntertainments: state.company.companyEntertainments,
  userId: state.user.id,
});

const actions = {
  getEventDetails: getEventInfo,
  getEventTypesList: getEventTypes,
  getEventList: getCompanyEntertainments,
  addRequest: eventRequest,
};

export default connect(stateProps, actions)(Entertainment);
