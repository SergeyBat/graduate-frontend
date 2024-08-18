import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import Layout from 'src/components/shared/Layout';
import bem from 'src/utils/bem';
import moment from 'moment';
import companyActions from 'src/redux/company/actions';
import entertainmentsActions from 'src/redux/entertainments/actions';
import { IStore } from '@redux/interfacesStore';
import EventBigCard from '@components/cards/EventBigCard';
import EventSmallCard from '@components/cards/EventSmallCard';
import { IEntertainment, IEntertainmentGroups } from 'src/interfaces';
import styles from './index.module.scss';

const {
  getCompanyEntertainments,
} = companyActions;
const {
  getEventTypes,
} = entertainmentsActions;

const b = bem('events-page', styles);

const Entertainments = (props: any) => {
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

  const getRandomEvent = useMemo(() => {
    const event = companyEntertainments && companyEntertainments.length
      ? companyEntertainments[Math.round(Math.random() * companyEntertainments.length)]
      : {};
    return (
      <EventBigCard event={event} eventTypes={eventTypes} />
    );
  }, [companyEntertainments, eventTypes]);

  const getNearestEvents = useMemo(() => {
    const events = companyEntertainments.filter((event: IEntertainment) => {
      const { dates } = event;
      const isNearest = dates.some((date) => {
        const now = moment();
        const startDate = moment(date.startDate);
        const hours = now.diff(startDate, 'hours');
        return hours > 0 && hours < 96;
      });
      return isNearest;
    });
    return (
      <div className={b('events')}>
        <div className={b('events-title')}>События в ближайшие дни</div>
        <div className={b('events-list')}>
          {
            events.map((event: IEntertainment, index: number) => (index < 3 ? <EventSmallCard event={event} eventTypes={eventTypes} /> : null))
          }
        </div>
      </div>
    );
  }, [companyEntertainments, eventTypes]);

  const getTopEvents = useMemo(() => (
    <div className={b('events')}>
      <div className={b('events-title')}>Топ 3</div>
      <div className={b('events-list')}>
        {
          companyEntertainments.map((event: IEntertainment, index: number) => (
            index < 3
              ? <EventSmallCard event={event} eventTypes={eventTypes} />
              : null))
        }
      </div>
    </div>
  ), [companyEntertainments, eventTypes]);

  const getGroups = useMemo(() => {
    const events = companyEntertainments.reduce((
      acc: IEntertainmentGroups,
      event: IEntertainment,
    ) => {
      const { typeId } = event;
      // @ts-ignore
      if (acc[typeId]) {
        return {
          ...acc,
          // @ts-ignore
          [typeId]: [...acc[typeId], event],
        };
      }
      return {
        ...acc,
        [typeId]: [event],
      };
    }, {});
    return (
      <div className={b('events')}>
        <div className={b('events-title')}>Подборки</div>
        <div className={b('events-list')}>
          {
            // @ts-ignore
            Object.values(events).map((event: IEntertainment[]) => (
              <EventSmallCard event={event[0]} eventTypes={eventTypes} withoutTitle />
            ))
          }
        </div>
      </div>
    );
  }, [companyEntertainments, eventTypes]);

  return (
    <Layout>
      <div className={b()}>
        <div className={b('top-event')}>{getRandomEvent}</div>
        <div className={b('list')}>{getNearestEvents}</div>
        <div className={b('list')}>{getTopEvents}</div>
        <div className={b('list')}>{getGroups}</div>
      </div>
    </Layout>
  );
};

const stateProps = (state: IStore) => ({
  companyEntertainments: state.company.companyEntertainments,
  eventTypes: state.entertainments.eventTypes,
});

const actions = {
  getEventList: getCompanyEntertainments,
  getEventTypesList: getEventTypes,
};

export default connect(stateProps, actions)(Entertainments);
