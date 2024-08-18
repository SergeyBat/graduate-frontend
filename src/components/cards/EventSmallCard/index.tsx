import { useMemo } from 'react';
import bem from 'src/utils/bem';
import 'moment/locale/ru';
import Link from 'next/link';
import backGroundImage from 'public/img/backgroundBigCardImage.png';
import moment from 'moment';
import { LOCALHOST_MINIO_IMAGES } from 'src/constants';
import { EventSmallCardProps } from './EventSmallCard.props';
import styles from './index.module.scss';

const b = bem('event-small-card', styles);

const EventSmallCard = (props: EventSmallCardProps): JSX.Element => {
  const {
    event,
    eventTypes,
    withoutTitle,
  } = props;
  const {
    city,
    typeId,
    name,
    id,
    price,
    startDate,
  } = event || {};

  const eventType = useMemo(() => eventTypes.find((item) => item.id === typeId) || {
    description: '',
  }, [typeId, eventTypes]);

  return (
    <Link className={b({ withoutTitle })} href={`/entertainment/${id}`}>
      {
        withoutTitle
          ? null
          : (
            <div className={b('top-block')}>
              <div className={b('top-block-tag')}>{`От ${price}р.`}</div>
            </div>
          )
      }
      <img className={b('image', { withoutTitle })} src={event && event.imageKey ? (LOCALHOST_MINIO_IMAGES + event.imageKey) : backGroundImage.src} alt="random event" />
      {
        withoutTitle
          ? (
            <div className={b('description')}>{eventType.description}</div>
          )
          : (
            <div className={b('bottom-block')}>
              <div className={b('bottom-block-title')}>{name}</div>
              <div className={b('bottom-block-time')}>{moment(startDate).format('DD-MM-YYYY hh:mm')}</div>
            </div>
          )
      }
    </Link>
  );
};

export default EventSmallCard;
