import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import bem from 'src/utils/bem';
import { Button, Upload } from 'antd';
import { Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import filesActions from 'src/redux/files/actions';
import actions from '../../redux/company/actions';
import styles from './index.module.scss';
import CustomInput from '../inputs/CustomInput';
import CustomTextarea from '../inputs/CustomTextarea';
import constants from './constants';
import { LOCALHOST_MINIO_IMAGES } from '../../constants';

const {
  INPUTS_NAMES,
  NAME,
  DESCRIPTION,
  CITY,
  ADDRESS,
  STATUS,
  ALBUM,
  TITLE_PARAMS,
  DESCRIPTION_PARAMS,
} = constants;

const b = bem('my-company', styles);

const MyCompanyMainInfo = (props) => {
  const {
    getMyCompany,
    selectedCompany,
    uploadImage,
    changeCompany,
  } = props;

  useEffect(() => {
    getMyCompany();
  }, []);

  useEffect(() => {
  }, [selectedCompany]);

  const handleChangeParams = ({
    value,
    name,
    idOtherParams,
    setFieldValue,
    additionalInfo,
  }) => {
    const newArray = additionalInfo.map((item) => (item.id === idOtherParams
      ? {
        ...item,
        [name]: value,
      }
      : item));
    setFieldValue(INPUTS_NAMES.additionalInfo, newArray);
  };

  const addOtherParams = (additionalInfo, setFieldValue) => {
    setFieldValue(INPUTS_NAMES.additionalInfo, [
      ...additionalInfo,
      {
        id: uuidv4(),
        [INPUTS_NAMES.titleParams]: '',
        [INPUTS_NAMES.descriptionParams]: '',
      },
    ]);
  };

  const deleteOtherParams = (
    otherParams,
    setFieldValue,
    idOtherParams,
  ) => {
    setFieldValue(
      INPUTS_NAMES.additionalInfo,
      otherParams.filter((item) => item.id !== idOtherParams),
    );
  };

  const onSubmit = (values) => {
    const {
      id,
      imageKet,
      name,
      description,
      city,
      address,
      additionalInfo,
    } = values;
    changeCompany(
      id,
      {
        imageKet,
        name,
        description,
        city,
        address,
        additionalInfo,
      },
    );
  };

  const onUploadImage = (data, setFieldValue) => {
    uploadImage(
      data,
      (imageKey) => setFieldValue('imageKey', imageKey),
      () => {},
    );
  };

  return (
    <div className={b('')}>
      {selectedCompany && Object.keys(selectedCompany).length && (
        <Formik
          initialValues={selectedCompany}
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
              additionalImages,
              additionalInfo,
              city,
              address,
              approved,
              imageKey,
            } = values;
            return (
              <form
                className={b('form-wrapper')}
                onSubmit={handleSubmit}
                name="organization"
              >
                <div className={b('main-info')}>
                  <div className={b('row-wrapper')}>
                    <div className={b('input-wrapper-column')}>
                      <div className={b('input-title')}>{NAME}</div>
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
                      <div className={b('input-title')}>{DESCRIPTION}</div>
                      <CustomTextarea
                        className={b('textarea-wrapper')}
                        inputClass={b('input')}
                        onChange={handleChange}
                        name={INPUTS_NAMES.description}
                        placeholder={DESCRIPTION}
                        value={description}
                        isValid={!errors.description}
                      />
                    </div>
                  </div>
                  <div className={b('input-wrapper-column')}>
                    <div className={b('input-wrapper-column')}>
                      <div className={b('input-title')}>{CITY}</div>
                      <CustomInput
                        className={b('input-wrapper')}
                        inputClass={b('input')}
                        onChange={handleChange}
                        name={INPUTS_NAMES.city}
                        placeholder={CITY}
                        value={city}
                        withMask={false}
                      />
                    </div>
                    <div className={b('input-wrapper-column')}>
                      <div className={b('input-title')}>{ADDRESS}</div>
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
                      <div className={b('input-title')}>{STATUS}</div>
                      <div
                        className={b('status-company', { isApproved: approved })}
                      >
                        {approved ? 'Подтверждена' : 'Ждет подтверждения'}
                      </div>
                    </div>
                  </div>
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
                <div className={b('additional-info')}>
                  {Boolean(additionalInfo?.length) && additionalInfo.map((item) => (
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
                          idOtherParams: item.id,
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
                          idOtherParams: item.id,
                          setFieldValue,
                          additionalInfo,
                        })}
                        name={INPUTS_NAMES.descriptionParams}
                        placeholder={DESCRIPTION_PARAMS}
                        value={item.description}
                        withMask={false}
                      />
                      <Button
                        onClick={() => deleteOtherParams(
                          additionalInfo,
                          setFieldValue,
                          item.id,
                        )}
                      >
                        Удалить параметр
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => addOtherParams(additionalInfo, setFieldValue)}
                >
                  Добавить параметры
                </Button>
                <div className={b('actions-form-wrap')}>
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
      )}
    </div>
  );
};

const mapStateToProps = ({ company }) => ({ ...company });

export default connect(
  mapStateToProps,
  {
    ...actions,
    ...filesActions,
  },
)(MyCompanyMainInfo);
