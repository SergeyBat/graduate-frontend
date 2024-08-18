import bem from 'src/utils/bem';
import 'moment/locale/ru';
import moment from 'moment';
import Link from 'next/link';
import Heart from '@components/svg/Heart';
import { LOCALHOST_MINIO_IMAGES } from 'src/constants';
import styles from './index.module.scss';
import { CompanyCardProps } from './CompanyCard.props';

const b = bem('company-card', styles);

const CompanyCard = ({ company }: CompanyCardProps): JSX.Element => {
  const {
    id,
    ownerId,
    imageKey,
    description,
    name,
    isDeleted,
    approved,
    address,
    city,
  } = company || {};

  return (
    <div className={b('')}>
      <div className={b('image-wrapper')}>
        {imageKey ? (
          <img
            className={b('image')}
            src={LOCALHOST_MINIO_IMAGES + imageKey}
            alt="company-img"
          />
        ) : <div className={b('insteadOfImage')}>Изображение отсутствует</div>}
      </div>
      <div className={b('wrapper-info')}>
        <span className={b('title')}>{name}</span>
        <div className={b('additional-info')}>
          <span className={b('description')}>{description || ''}</span>
          {city && address && (
            <span className={b('address')}>
              {city && <span>{address ? `${city}, ` : city}</span>}
              <span>{address}</span>
            </span>
          )}
          <Link className={b('link-company')} href={`/company/${id}`}>{'Подробнее >'}</Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
