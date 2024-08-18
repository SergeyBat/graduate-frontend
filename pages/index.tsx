import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import Layout from 'src/components/shared/Layout';
import bem from 'src/utils/bem';
import moment from 'moment';
import companyActions from 'src/redux/company/actions';
import entertainmentsActions from 'src/redux/entertainments/actions';
import backGroundImage from 'public/img/backgroundBigCardImage.png';
import { IStore } from '@redux/interfacesStore';
import EventBigCard from '@components/cards/EventBigCard';
import EventSmallCard from '@components/cards/EventSmallCard';
import {
  ICompany, IEntertainment, IEntertainmentGroups, IEntertainmentType,
} from 'src/interfaces';
import { LOCALHOST_MINIO_IMAGES } from 'src/constants';
import styles from './index.module.scss';

const {
  getCompanyEntertainments,
  getAllCompaniesInfo,
} = companyActions;
const {
  getEventTypes,
} = entertainmentsActions;

interface IProps {
  getEventList: () => void,
  getEventTypesList: () => void,
  getCompanies: () => void,
  companyEntertainments: IEntertainment[],
  eventTypes: IEntertainmentType[],
}

const b = bem('main-page', styles);

const Home = (props: any) => {
  const {
    getEventList,
    companyEntertainments,
    getEventTypesList,
    eventTypes,
    getCompaniesList,
    companies,
  } = props;

  useEffect(() => {
    getEventList();
    getEventTypesList();
    getCompaniesList();
  }, []);

  const getRandomEvent = useMemo(() => {
    const event = companyEntertainments[Math.round(Math.random() * companyEntertainments.length)];
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
        const hours = startDate.diff(now, 'hours');
        return hours > 0 && hours < 96;
      });
      return isNearest;
    });
    return (
      <div className={b('events')}>
        <div className={b('events-title')}>События в ближайшие дни</div>
        <div className={b('events-list')}>
          {
            events.map((
              event: IEntertainment,
              index: number,
            ) => (index < 3 ? <EventSmallCard event={event} eventTypes={eventTypes} /> : null))
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
          companyEntertainments.map((
            event: IEntertainment,
            index: number,
          ) => (index < 3 ? <EventSmallCard event={event} eventTypes={eventTypes} /> : null))
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
            Object.values(events).map(
            // @ts-ignore
              (event: IEntertainment[]) => (
                <EventSmallCard
                  event={event[0]}
                  eventTypes={eventTypes}
                  withoutTitle
                />
              ),
            )
          }
        </div>
      </div>
    );
  }, [companyEntertainments, eventTypes]);

  const getCompanies = useMemo(() => {
    const firstCompany = companies[4];
    const otherTwoCompanies = companies.slice(1, 3);
    return (
      <div className={b('companies')}>
        <div className={b('companies-title')}>Организации</div>
        <div className={b('companies-list')}>
          <div className={b('main-company')}>
            <img className={b('main-company-image')} src={firstCompany && firstCompany.imageKey ? (LOCALHOST_MINIO_IMAGES + firstCompany.imageKey) : backGroundImage.src} alt="random event" />
          </div>
          <div className={b('other-companies')}>
            {
              otherTwoCompanies.map((item: ICompany) => (
                <div className={b('other-company')}>
                  <img className={b('other-company-image')} src={item && item.imageKey ? (LOCALHOST_MINIO_IMAGES + item.imageKey) : backGroundImage.src} alt="random event" />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }, [companies]);

  return (
    <Layout>
      <div className={b()}>
        <div className={b('top-event')}>{getRandomEvent}</div>
        <div className={b('list')}>{getNearestEvents}</div>
        <div className={b('list')}>{getTopEvents}</div>
        <div className={b('list')}>{getGroups}</div>
        <div className={b('list')}>{getCompanies}</div>
      </div>
    </Layout>
  );
};

const stateProps = (state: IStore) => ({
  companyEntertainments: state.company.companyEntertainments,
  companies: state.company.companiesList,
  eventTypes: state.entertainments.eventTypes,
});

const actions = {
  getEventList: getCompanyEntertainments,
  getEventTypesList: getEventTypes,
  getCompaniesList: getAllCompaniesInfo,
};

export default connect(stateProps, actions)(Home);
