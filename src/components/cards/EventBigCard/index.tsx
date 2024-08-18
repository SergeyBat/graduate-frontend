import bem from 'src/utils/bem';
import 'moment/locale/ru';
import Link from 'next/link';
import { LOCALHOST_MINIO_IMAGES } from 'src/constants';
import backGroundImage from 'public/img/backgroundBigCardImage.png';
import { useMemo } from 'react';
import { EventBigCardProps } from './EventBigCard.props';
import styles from './index.module.scss';

const b = bem('event-big-card', styles);

const EventBigCard = (props: EventBigCardProps): JSX.Element => {
  const {
    event,
    eventTypes,
    isInfo,
  } = props;
  const {
    city,
    typeId,
    name,
    id,
  } = event || {};

  const eventType = useMemo(() => eventTypes.find((item) => item.id === typeId) || {
    description: '',
  }, [typeId, eventTypes]);

  return (
    <Link className={b()} href={`/entertainment/${id}`}>
      <div className={b('top-block', { isInfo })}>
        <div className={b('top-block-tag')}>{eventType.description}</div>
        <div className={b('top-block-tag')}>{city}</div>
      </div>
      <img className={b('image')} src={event && event.imageKey ? (LOCALHOST_MINIO_IMAGES + event.imageKey) : backGroundImage.src} alt="random event" />
      { !isInfo ? (
          <div className={b('bottom-block')}>
            <div className={b('bottom-block-title')}>{name}</div>
          </div>
        ) : null
      }
    </Link>
  );
};

export default EventBigCard;
