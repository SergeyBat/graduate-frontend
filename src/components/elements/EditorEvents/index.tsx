import React, { useEffect, useState } from 'react';
import bem from '@utils/bem';
import {
  Button, ConfigProvider,
  DatePicker,
  Select,
  Upload,
} from 'antd';
import CustomInput from '@components/inputs/CustomInput';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import CustomTextarea from '@components/inputs/CustomTextarea';
import moment from 'moment';
// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from 'dayjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'dayjs/locale/ru';
import 'moment/locale/ru';
import { connect } from 'react-redux';
import actions from 'src/redux/company/actions';
import filesActions from 'src/redux/files/actions';
import { LOCALHOST_MINIO_IMAGES, AGE_RESTRICTION } from 'src/constants';
import entertainmentsActions from 'src/redux/entertainments/actions';
import locale from 'antd/locale/ru_RU';
import constants from './constants';
import styles from './index.module.scss';

const b = bem('editor-events', styles);

const {
  INPUTS_NAMES,
  NAME,
  DESCRIPTION,
  TITLE_PARAMS,
  DESCRIPTION_PARAMS,
  SHOULD_BE_FILLED,
  CITY,
  ADDRESS,
  LIMIT_USER,
  PRICE,
} = constants;

const schema = Yup.object().shape({
  name: Yup.string()
    .required(SHOULD_BE_FILLED),
  limitUsers: Yup.string()
    .required(SHOULD_BE_FILLED),
  price: Yup.string()
    .required(SHOULD_BE_FILLED),
  address: Yup.object()
    .required(SHOULD_BE_FILLED),
  typeId: Yup.number()
    .required(SHOULD_BE_FILLED),
});

function EditorEvents(props: any): JSX.Element {
  const {
    onCancel,
    changeableEvent,
    setChangeableEvent,
    uploadImage,
    eventTypes,
    createEventDate,
    changeEventDate,
    deleteDateEvent,
  } = props;

  const [dates, setNewDateList] = useState(changeableEvent.dates || []);

  const isNew = !Object.keys(changeableEvent)?.length;

  const onGoBack = () => {
    onCancel();
    setChangeableEvent({});
  };

  const initialState = {
    imageKey: changeableEvent.imageKey || '',
    name: changeableEvent.name || '',
    description: changeableEvent.description || '',
    limitUsers: changeableEvent.limitUsers || '',
    price: changeableEvent.price || '',
    typeId: changeableEvent.typeId || '',
    additionalInfo: changeableEvent.additionalInfo || [],
    address: changeableEvent.address,
    city: changeableEvent.city || '',
    imageList: changeableEvent.imageList || [],
    ageLimit: changeableEvent.ageLimit || '',
  };

  const handleChangeParams = ({
    value,
    name,
    idAdditionalInfo,
    setFieldValue,
    additionalInfo,
  }: {
    value: string,
    name: string,
    idAdditionalInfo: number,
    setFieldValue(fieldingName: string, fieldingValue: any): void,
    additionalInfo: any,
  }) => {
    const newArray = additionalInfo.map((item: any) => (item.id === idAdditionalInfo
      ? {
        ...item,
        [name]: value,
      }
      : item));
    setFieldValue(INPUTS_NAMES.additionalInfo, newArray);
  };

  const addadditionalInfo = (additionalInfo: any, setFieldValue: any) => {
    setFieldValue(INPUTS_NAMES.additionalInfo, [
      ...additionalInfo,
      {
        id: uuidv4(),
        [INPUTS_NAMES.titleParams]: '',
        [INPUTS_NAMES.descriptionParams]: '',
      },
    ]);
  };

  const deleteadditionalInfo = (
    additionalInfo: any,
    setFieldValue: any,
    idadditionalInfo: number,
  ) => {
    setFieldValue(
      INPUTS_NAMES.additionalInfo,
      additionalInfo.filter((item: any) => item.id !== idadditionalInfo),
    );
  };

  const onSubmit = ({
    name,
    description,
    limitUsers,
    price,
    typeId,
    additionalInfo,
    address,
    imageKey,
    imageList,
  }: any) => {
    const newValue = {
      name,
      description,
      limitUsers,
      price,
      typeId,
      additionalInfo,
      address,
      imageKey,
      imageList,
    };
    console.log('=>(index.tsx:156) newValue', newValue);
  };

  const onSubmitDate = (values: any) => {
    const {
      eventId,
      startDate,
      endDate,
      isNewDate,
    } = values;
    if (isNewDate) {
      createEventDate({
        eventId,
        startDate,
        endDate,
      });
    } else {
      changeEventDate(eventId, {
        startDate,
        endDate,
      });
    }
  };

  const onUploadImage = (data: any, setFieldValue: any) => {
    uploadImage(
      data,
      (imageKey: any) => setFieldValue('imageKey', imageKey),
      () => {},
    );
  };

  const onDeleteDate = (values: any) => {
    const { isNewDate, id } = values;
    if (isNewDate) {
      setNewDateList(dates.filter((item: any) => item.id !== id));
    } else {
      deleteDateEvent(id);
    }
  };

  return (
    <div className={b('')}>
      <Formik
        initialValues={initialState}
        validationSchema={schema}
        onSubmit={(values) => onSubmit(values)}
      >
        {({
          errors,
          handleSubmit,
          touched,
          handleChange,
          values,
          setFieldValue,
        }) => {
          const {
            name,
            description,
            address,
            limitUsers,
            price,
            additionalInfo,
            city,
            imageKey,
            ageLimit,
            typeId,
          } = values;
          return (
            <form
              className={b('event-main-info')}
              onSubmit={handleSubmit}
              name="event-main-info"
            >
              <div className={b('row-wrapper')}>
                <div className={b('wrapper-column')}>
                  <Upload
                    name="profile"
                    className={b('uploader-wrapper')}
                    maxCount={1}
                    action=""
                    onChange={(uploadData) => {
                      onUploadImage(uploadData, setFieldValue);
                    }}
                    beforeUpload={() => false}
                    showUploadList={{ showPreviewIcon: false, showRemoveIcon: false }}
                  >
                    <div className={b('uploader-image-wrapper')}>
                      {imageKey ? (
                        <img
                          className={b('uploading-image')}
                          src={LOCALHOST_MINIO_IMAGES + imageKey}
                          alt="main"
                        />
                      ) : <span>Загрузите изображение</span>}
                      <div className={b('uploader-text')}>
                        Загрузить
                      </div>
                    </div>
                  </Upload>
                </div>
                <div className={b('wrapper-column')}>
                  <div className={b('input-wrapper-column')}>
                    <div className={b('title')}>Название мероприятия</div>
                    <CustomInput
                      className={b('input-wrapper')}
                      inputClass={b('input')}
                      onChange={handleChange}
                      name={INPUTS_NAMES.name}
                      placeholder={NAME}
                      value={name}
                      isTouched={touched.name}
                      error={errors.name}
                      isValid={!errors.name}
                      withMask={false}
                    />
                  </div>
                  <div className={b('input-wrapper-column')}>
                    <div className={b('title')}>О мероприятии</div>
                    <CustomTextarea
                      className={b('input-wrapper')}
                      inputClass={b('input')}
                      onChange={handleChange}
                      name={INPUTS_NAMES.description}
                      placeholder={DESCRIPTION}
                      value={description}
                      isValid={!errors.description}
                    />
                  </div>
                </div>
                <div className={b('wrapper-column')}>
                  <div className={b('input-wrapper-column')}>
                    <div className={b('title')}>Место проведения</div>
                    <CustomInput
                      className={b('input-wrapper')}
                      inputClass={b('input')}
                      onChange={({
                        target: {
                          value,
                        },
                      }) => (
                        setFieldValue(INPUTS_NAMES.city, value)
                      )}
                      name={INPUTS_NAMES.city}
                      placeholder={CITY}
                      value={city}
                      withMask={false}
                    />
                    <CustomInput
                      className={b('input-wrapper')}
                      inputClass={b('input')}
                      onChange={handleChange}
                      name={INPUTS_NAMES.address}
                      placeholder={ADDRESS}
                      value={address}
                      withMask={false}
                    />
                  </div>
                  <div className={b('input-wrapper-column')}>
                    <div className={b('title')}>Тип мероприятия</div>
                    <Select
                      className={b('filter-select')}
                      allowClear
                      options={eventTypes.map(({
                        id: listTypeId,
                        description: typeDescription,
                      }: any) => ({ label: typeDescription, value: listTypeId }))}
                      onChange={({ value }) => setFieldValue(INPUTS_NAMES.typeId, value)}
                      value={typeId}
                    />
                  </div>
                </div>
                <div className={b('wrapper-column')}>
                  <div className={b('input-wrapper-column')}>
                    <div className={b('title')}>{LIMIT_USER}</div>
                    <CustomInput
                      className={b('input-wrapper')}
                      inputClass={b('input')}
                      onChange={handleChange}
                      name={INPUTS_NAMES.limitUsers}
                      placeholder={LIMIT_USER}
                      value={limitUsers}
                      isTouched={touched.limitUsers}
                      error={errors.limitUsers}
                      isValid={!errors.limitUsers}
                      withMask={false}
                    />
                  </div>
                </div>
                <div className={b('wrapper-column')}>
                  <div className={b('input-wrapper-column')}>
                    <div className={b('title')}>{PRICE}</div>
                    <CustomInput
                      className={b('input-wrapper')}
                      inputClass={b('input')}
                      onChange={handleChange}
                      name={INPUTS_NAMES.price}
                      placeholder={PRICE}
                      value={price}
                      isTouched={touched.price}
                      error={errors.price}
                      isValid={!errors.price}
                      withMask={false}
                    />
                  </div>
                </div>
                <div className={b('wrapper-column')}>
                  <div className={b('input-wrapper-column')}>
                    <div className={b('title')}>Возрастное ограничение</div>
                    <Select
                      className={b('filter-select')}
                      allowClear
                      options={AGE_RESTRICTION}
                      onChange={({ value }) => { setFieldValue(INPUTS_NAMES.ageLimit, value); }}
                      value={ageLimit}
                    />
                  </div>
                </div>
              </div>
              <div className={b('row-wrapper')}>
                <div className={b('wrapper-column')}>
                  <div className={b('title')}>Дополнительные параметры</div>
                  {Boolean(additionalInfo?.length) && additionalInfo.map((item: any) => (
                    <div className={b('other-params-wrapper')}>
                      <CustomInput
                        className={b('input-wrapper')}
                        inputClass={b('input')}
                        onChange={({
                          target: {
                            value,
                            name: nameTarget,
                          },
                        }) => handleChangeParams({
                          value,
                          name: nameTarget,
                          idAdditionalInfo: item.id,
                          setFieldValue,
                          additionalInfo,
                        })}
                        name={INPUTS_NAMES.titleParams}
                        placeholder={TITLE_PARAMS}
                        value={item.title}
                        withMask={false}
                      />
                      <CustomInput
                        className={b('input-wrapper')}
                        inputClass={b('input')}
                        onChange={({
                          target: {
                            value,
                            name: nameTarget,
                          },
                        }) => handleChangeParams({
                          value,
                          name: nameTarget,
                          idAdditionalInfo: item.id,
                          setFieldValue,
                          additionalInfo,
                        })}
                        name={INPUTS_NAMES.descriptionParams}
                        placeholder={DESCRIPTION_PARAMS}
                        value={item.description}
                        withMask={false}
                      />
                      <Button
                        onClick={() => deleteadditionalInfo(
                          additionalInfo,
                          setFieldValue,
                          item.id,
                        )}
                      >
                        Удалить параметр
                      </Button>
                    </div>
                  ))}
                  <Button
                    onClick={() => addadditionalInfo(additionalInfo, setFieldValue)}
                  >
                    Добавить параметры
                  </Button>
                </div>
              </div>
              <div className={b('actions-form-wrap')}>
                <Button className={b('btn')} onClick={onGoBack}>
                  Отмена
                </Button>
                <Button
                  className={b('btn')}
                  onClick={() => onSubmit(values)}
                >
                  Сохранить
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
      {
        !isNew && (
          <div className={b('dates-wrapper')}>
            <div className={b('title')}>Даты проведения</div>
            {dates.map((item: any) => (
              <Formik
                initialValues={{ ...item }}
                validationSchema={schema}
                onSubmit={(values) => onSubmitDate(values)}
              >
                {({
                  values,
                  setFieldValue,
                }) => {
                  const {
                    startDate,
                    endDate,
                  } = values;
                  return (
                    <form className={b('form-date-wrapper')}>
                      <div className={b('date-wrapper')}>
                        <div className={b('date-title')}>Дата начала</div>
                        <ConfigProvider locale={locale}>
                          <DatePicker
                            format="DD-MM-YYYY HH:mm"
                            showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                            onOk={(e: any) => {
                              const newDate = new Date(e);
                              setFieldValue('startDate', newDate);
                            }}
                            value={dayjs(startDate)}
                          />
                        </ConfigProvider>
                      </div>
                      <div className={b('date-wrapper')}>
                        <div className={b('date-title')}>Дата окончания</div>
                        <ConfigProvider locale={locale}>
                          <DatePicker
                            format="DD-MM-YYYY HH:mm"
                            showTime={{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }}
                            onOk={(e: any) => {
                              const newDate = new Date(e);
                              setFieldValue('endDate', newDate);
                            }}
                            value={dayjs(endDate)}
                          />
                        </ConfigProvider>
                      </div>
                      <Button className={b('btn-date')} onClick={() => onSubmitDate(values)}>
                        Сохранить
                      </Button>
                      <Button className={b('btn-date')} onClick={() => onDeleteDate(values)}>
                        Удалить
                      </Button>

                    </form>
                  );
                }}
              </Formik>
            ))}
            <Button
              onClick={() => setNewDateList([
                ...dates,
                {
                  id: uuidv4(),
                  isNewDate: true,
                  eventId: changeableEvent.id,
                  startDate: moment(),
                  endDate: moment(),
                },
              ])}
            >
              Добавить слот времени
            </Button>
          </div>
        )
      }
    </div>
  );
}

const mapStateToProps = ({
  company,
  entertainments,
}: any) => ({
  ...company,
  ...entertainments,
});

export default connect(
  mapStateToProps,
  {
    ...actions,
    ...filesActions,
    ...entertainmentsActions,
  },
)(EditorEvents);
