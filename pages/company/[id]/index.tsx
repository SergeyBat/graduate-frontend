import React, { useEffect, useState } from 'react';
import Layout from '@components/shared/Layout';
import bem from '@utils/bem';
import actions from '@redux/company/actions/index';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import {
  Button, Image, Rate,
} from 'antd';
import { LOCALHOST_MINIO_IMAGES } from 'src/constants';
import CustomTextarea from '@components/inputs/CustomTextarea';
import notification from '@components/notification';
import styles from './index.module.scss';

const b = bem('company', styles);

const Company = (props: any) => {
  const {
    getCompany,
    selectedCompany,
    userId,
    createCompanyReviews,
    getCompanyReviews,
    companyReviews,
  } = props;
  const router = useRouter();
  const { query: { id } } = router;

  const [reviewsText, setReviewsText] = useState('');
  const [reviewsRate, setReviewsRate] = useState(2.5);

  useEffect(() => {
    getCompany(Number(id));
    getCompanyReviews(Number(id));
  }, []);

  const onSubmitReviews = () => {
    if (reviewsRate && id && reviewsText && userId) {
      const reviewsData = {
        review: reviewsText,
        companyId: Number(id),
        estimation: Number(reviewsRate),
      };
      createCompanyReviews(reviewsData, () => getCompanyReviews(Number(id)));
      setReviewsText('');
      setReviewsRate(2.5);
    } else {
      notification('error', 'Проверьте заполненные данные');
    }
  };

  const {
    description,
    imageKey,
    name,
    additionalImages = [],
    additionalInfo = [],
    address,
    city,
  } = selectedCompany || {};

  const entertainments = [{
    id: 7,
    name: 'Джон Уик 4',
    companyId: 4,
    typeId: 15,
    limitUsers: 100,
    price: 250,
    isDeleted: false,
    address: 'площадь Мира, 7',
    city: 'Таганрог',
    ageLimit: 18,
    imageUrl: 'http://localhost:9000/images/John_Wick_4_poster.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIOSFODNN7EXAMPLE%2F20230603%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230603T113132Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=b27b11b78d24a5e2e02d3730fe45b13a30cebd8667ed1b531d3d3ff322f69e7a',
  }];

  return (
    <Layout className={b('')} navColor="purple">
      <div className={b('images-block-wrapper')}>
        {imageKey && (
          <div className={b('main-image-wrapper')}>
            <img
              className={b('image')}
              src={LOCALHOST_MINIO_IMAGES + imageKey}
              alt="main"
            />
          </div>
        )}
        {
          (city || address) && (
            <div className={b('address')}>
              <span className={b('address-title')}>Наш адрес:</span>
              <span>{city}</span>
              <span>{address}</span>
            </div>
          )
        }
        {Boolean(additionalImages?.length) && (
          <div className={b('album-wrapper')}>
            {
              additionalImages.map((item: any) => (
                <div className={b('one-image-wrapper')}>
                  <Image className={b('image-from-album')} src={LOCALHOST_MINIO_IMAGES + item} alt="company-img" />
                </div>
              ))
            }
          </div>
        )}
        <form name="reviews" className={b('reviews-form')}>
          <div className={b('reviews-title-wrapper')}>
            <div className={b('sub-title')}>Ваш отзыв: </div>
            <Rate
              onChange={(value) => setReviewsRate(value)}
              value={reviewsRate}
              allowHalf
            />
          </div>
          <CustomTextarea
            className={b('textarea-wrapper', { mix: b('reviews-wrapper') })}
            inputClass={b('input')}
            onChange={({ target: { value } }) => setReviewsText(value)}
            name="reviewsText"
            placeholder="Оставьте здесь отзыв"
            value={reviewsText}
          />
          <Button
            className={b('form-reviews-btn')}
            onClick={onSubmitReviews}
          >
            Отправить
          </Button>
        </form>
      </div>
      <div className={b('main-info-wrapper')}>
        <div className={b('title')}>{name}</div>
        <div className={b('description')}>{description}</div>
        <div className={b('entertainments-wrapper')}>
          <div className={b('sub-title')}>
            Наши мероприятия:
          </div>
          <div className={b('entertainments-list')}>
            {
              entertainments.map((item) => (
                <div>
                  {item.name}
                </div>
              ))
            }
          </div>
        </div>
        {Boolean(additionalInfo?.length) && (
          <div className={b('additional-info-wrapper')}>
            <div className={b('sub-title')}>Дополнительная информация:</div>
            {
              additionalInfo.map((item: any) => (
                <div className={b('additional-info')}>
                  <span className={b('additional-title')}>
                    {item.title}
                    :
                  </span>
                  <span className={b('additional-description')}>{item.description}</span>
                </div>
              ))
            }
          </div>
        )}
        {Boolean(companyReviews?.length) && (
          <div className={b('reviews-list')}>
            <div className={b('sub-title')}>Отзывы:</div>
            {companyReviews.map((item: any) => (
              <div className={b('review')}>
                <div className={b('review-title')}>
                  Пользователь
                  {' '}
                  {item.userId}
                  <Rate
                    defaultValue={item.estimation}
                    disabled
                  />
                </div>
                <div className={b('reviews-test')}>
                  {item.review}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

const mapStateToProps = ({
  company,
  user: {
    id: userId,
  },
}: any) => ({
  ...company,
  userId,
});

export default connect(mapStateToProps, actions)(Company);
