import bem from 'src/utils/bem';
import 'moment/locale/ru';
import moment from 'moment';
import Link from 'next/link';
import Heart from '@components/svg/Heart';
import { useAppSelector } from 'src/hooks/reduxHooks/hooks';
import { IEntertainmentType } from 'src/interfaces';
import { EventMiddleCardProps } from './EventMiddleCard.props';
import styles from './index.module.scss';

const b = bem('event-middle-card', styles);

const EventMiddleCard = ({ event }: EventMiddleCardProps): JSX.Element => {
  const {
    eventTypes,
  }: {
    eventTypes: IEntertainmentType[]
  } = useAppSelector(({ entertainments }) => entertainments);
  const {
    id,
    imageUrl,
    name,
    description,
    address,
    price,
    typeId,
    dates,
    city,
  } = event;

  const eventType = eventTypes.find((item) => item.id === typeId)
    || { description: '' };

  const { startDate = '' } = dates[0] || {};
  return (
    <div className={b('')}>
      {imageUrl ? (
        <img
          className={b('image')}
          src={imageUrl}
          alt="company-img"
        />
      )
        : <div className={b('insteadOfImage')}>Изображение отсутствует</div>}
      <div className={b('hover-wrapper')}>
        <div className={b('price')}>
          {price}
          {' '}
          р
        </div>
        <button className={b('heart-button')} type="button">
          <Heart className={b('heart')} fill="#fff" />
        </button>
      </div>
      <div className={b('wrapper-info')}>
        <span className={b('title')}>{name}</span>
        <div className={b('additional-info-wrapper')}>
          <div className={b('address-and-date')}>
            {startDate && (
              <span className={b('address')}>
                {`Ближайшая дата: ${moment(startDate).format('DD MMM YYYY, HH:mm')}`}
              </span>
            )}
            {startDate && city && ' - '}
            {city && (
              <span className={b('address')}>{city}</span>
            )}
          </div>
          <div className={b('additional-info')}>
            <span className={b('category-event')}>{eventType.description || ''}</span>
            <Link className={b('link-event')} href={`/entertainment/${id}`}>{'Подробнее >'}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventMiddleCard;
